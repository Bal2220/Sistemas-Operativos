const ShoppingCartModel = require("../models/shoppingCartsModel");
const mongoose = require("mongoose");
module.exports = {
  // Crear un nuevo carrito de compras
createShoppingCart: async (req, res) => {
  const body = req.body;
  const { user_id } = body;  // Obtener el user_id del body

  try {
    // Verificar si el usuario ya tiene un carrito de compras
    const existingCart = await ShoppingCartModel.findOne({ user_id });

    if (existingCart) {
      // Si ya existe un carrito para el usuario, devolver un error
      return res.status(400).send("El usuario ya tiene un carrito de compras.");
    }

    // Si no existe, crear el carrito de compras
    const carrito = await ShoppingCartModel.create(body);
    
  } catch (error) {
    console.log("Error al crear el carrito de compras:", error);
  }
},





getShoppingCartByUserId: async (req, res) => {
    const userId = req.params.userId;  // Obtener el ID del usuario desde los parámetros de la URL
    try {
      const respuesta = await ShoppingCartModel.aggregate([
        // Paso 1: Filtrar el carrito de compras por el user_id
        { 
          $match: { user_id: mongoose.Types.ObjectId(userId) } 
        },

        // Paso 2: Desenrollar el array de productos para trabajar con cada producto individualmente
        { $unwind: "$products" },

        // Paso 3: Hacer un $lookup para obtener los detalles del producto (como la foto) desde la colección "products"
        {
          $lookup: {
            from: "products",  // La colección con la que queremos hacer el join
            localField: "products.product_id",  // Campo en el carrito que referencia al producto
            foreignField: "_id",  // Campo en la colección de productos que hace el match
            as: "product_details"  // Alias para los detalles del producto
          }
        },

        // Paso 4: Desenrollar el array "product_details" para acceder a la información del producto
        { $unwind: "$product_details" },

        // Paso 5: Seleccionar solo los campos necesarios y obtener la primera foto del producto
        {
          $project: {
            "user_id": 1,
            "products.product_id": 1,
            "products.quantity": 1,
            "product_details.name": 1,
            "product_details.price": 1,
            "product_details.photo_url": { $arrayElemAt: ["$product_details.photos", 0] }  // Obtener solo la primera foto
          }
        }
      ]);

      if (!respuesta || respuesta.length === 0) {
        return res.status(404).send("Carrito de compras no encontrado para este usuario.");
      }

      // Reestructuramos la respuesta para devolver el carrito con los productos y sus fotos
      const productos = respuesta.map(item => ({
        product_id: item.products.product_id,
        quantity: item.products.quantity,
        name: item.product_details.name,
        price: item.product_details.price,
        photo_url: item.product_details.photo_url  // Incluir la foto del producto
      }));

      res.send({ user_id: userId, products: productos });  // Enviar el carrito con los productos y fotos
    } catch (error) {
      console.log("Error al obtener el carrito de compras del usuario:", error);
      res.status(500).send("Error al obtener el carrito de compras del usuario");
    }
  },

  // Obtener todos los carritos de compras
  getAllShoppingCarts: async (req, res) => {
    try {
      const respuesta = await ShoppingCartModel.find({});  // Obtener todos los carritos de la base de datos
      res.send(respuesta);  // Enviar la respuesta al cliente
    } catch (error) {
      console.log("Error al obtener los carritos de compras:", error);
      res.status(500).send("Error al obtener los carritos de compras");
    }
  },

  // Actualizar un carrito de compras por su ID
updateShoppingCart: async (req, res) => {
  const { products } = req.body; // Obtener el array de productos
  const userId = req.params.userId;  // Obtener el ID del usuario desde los parámetros de la URL

  // Validación: asegurarse de que el array de productos esté presente y cada producto tenga un price
  if (!Array.isArray(products) || products.length === 0) {
    return res.status(400).send("Debe proporcionar un array de productos.");
  }

  // Validar que cada producto tenga los campos necesarios
  for (let product of products) {
    if (!product.product_id || !product.quantity || !product.price) {
      return res.status(400).send("Cada producto debe tener un product_id, quantity y price.");
    }
  }

  try {
    // Buscar el carrito del usuario
    const carrito = await ShoppingCartModel.findOne({ user_id: userId });

    if (!carrito) {
      return res.status(404).send("Carrito de compras no encontrado para este usuario.");
    }

    // Agregar productos al carrito sin duplicar
    const updatedCart = await ShoppingCartModel.findOneAndUpdate(
      { user_id: userId },  // Buscar el carrito por el ID del usuario
      { $addToSet: { products: { $each: products } } },  // Usar $addToSet para evitar duplicados
      { new: true } // Retorna el documento actualizado
    );

    res.send(updatedCart); // Enviar el carrito actualizado al cliente
  } catch (error) {
    console.log("Error al actualizar el carrito de compras:", error);
    res.status(500).send("Error al actualizar el carrito de compras");
  }
},


  emptyShoppingCart: async (req, res) => {
  const userId = req.params.userId;  // Obtener el ID del usuario de los parámetros de la URL
  try {
    const respuesta = await ShoppingCartModel.findOneAndUpdate(
      { user_id: userId }, 
      { $set: { products: [] } },  // Vaciar el array de productos
      { new: true }
    );
    if (!respuesta) {
      return res.status(404).send("Carrito de compras no encontrado para este usuario.");
    }
    res.send(respuesta);  // Enviar el carrito vacío al cliente
  } catch (error) {
    console.log("Error al vaciar los productos del carrito:", error);
    res.status(500).send("Error al vaciar los productos del carrito");
  }},


  // Eliminar un carrito de compras por su ID
  deleteShoppingCart: async (req, res) => {
    const id = req.params.id;  // Obtener el ID del carrito a eliminar
    try {
      const respuesta = await ShoppingCartModel.deleteOne({ _id: id });  // Eliminar el carrito de la base de datos
      res.send(respuesta);  // Enviar la respuesta al cliente
    } catch (error) {
      console.log("Error al eliminar el carrito de compras:", error);
      res.status(500).send("Error al eliminar el carrito de compras");
    }
  },


  removeProductsFromCart: async (req, res) => {
  const { product_ids } = req.body;  // Array de ids de productos a eliminar
  const userId = req.params.userId;  // Obtener el ID del usuario desde los parámetros de la URL

  // Validar si se pasaron los IDs de los productos
  if (!Array.isArray(product_ids) || product_ids.length === 0) {
    return res.status(400).send("Debe proporcionar un array de product_ids.");
  }

  try {
    // Buscar el carrito del usuario
    const carrito = await ShoppingCartModel.findOne({ user_id: userId });
    
    if (!carrito) {
      return res.status(404).send("Carrito de compras no encontrado.");
    }

    // Eliminar los productos especificados
    const respuesta = await ShoppingCartModel.updateOne(
      { user_id: userId },  // Buscar el carrito del usuario
      { $pull: { products: { product_id: { $in: product_ids } } } }  // Eliminar productos por sus ids
    );

    res.send({
      message: "Productos eliminados con éxito",
      updatedCart: await ShoppingCartModel.findOne({ user_id: userId })  // Devolver el carrito actualizado
    });
  } catch (error) {
    console.log("Error al eliminar productos del carrito:", error);
    res.status(500).send("Error al eliminar productos del carrito");
  }
},

};
