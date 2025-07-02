const FavoriteProductModel = require("../models/favoriteProductsModel");

module.exports = {
  // Crear un nuevo producto favorito
  createFavoriteProduct: async (req, res) => {
    const body = req.body;
    try {
      const respuesta = await FavoriteProductModel.create(body);  // Crear el producto favorito en la base de datos
      res.send(respuesta);  // Enviar la respuesta al cliente
    } catch (error) {
      console.log("Error al crear el producto favorito:", error);
      res.status(500).send("Error al crear el producto favorito");
    }
  },

  // Obtener todos los productos favoritos
  getAllFavoriteProducts: async (req, res) => {
    try {
      const respuesta = await FavoriteProductModel.find({});  // Obtener todos los productos favoritos de la base de datos
      res.send(respuesta);  // Enviar la respuesta al cliente
    } catch (error) {
      console.log("Error al obtener los productos favoritos:", error);
      res.status(500).send("Error al obtener los productos favoritos");
    }
  },

  // Obtener todos los productos favoritos de un usuario
// Obtener todos los productos favoritos de un usuario
getFavoriteProductsByUser: async (req, res) => {
  const userId = req.params.userId; // Obtener el userId desde los parámetros de la URL

  try {
    // Buscar productos favoritos donde el 'user_id' coincida con el parámetro recibido
    const respuesta = await FavoriteProductModel.find({ user_id: userId }); // Nota: Cambié 'userId' por 'user_id'
    
    if (respuesta.length > 0) {
      res.status(200).send(respuesta); // Enviar la lista de productos favoritos si se encontraron
    } else {
      res.status(404).send("No se encontraron productos favoritos para este usuario"); // Si no hay productos favoritos
    }
  } catch (error) {
    console.log("Error al obtener los productos favoritos del usuario:", error);
    res.status(500).send("Error al obtener los productos favoritos");
  }
},


  // Actualizar un producto favorito por su ID
  updateFavoriteProduct: async (req, res) => {
    const body = req.body;
    const id = req.params.id;  // Obtener el ID del producto favorito a actualizar
    try {
      const respuesta = await FavoriteProductModel.findOneAndUpdate({ _id: id }, body, { new: true });
      res.send(respuesta);  // Enviar la respuesta al cliente
    } catch (error) {
      console.log("Error al actualizar el producto favorito:", error);
      res.status(500).send("Error al actualizar el producto favorito");
    }
  },

  // Eliminar un producto favorito por su ID
  deleteFavoriteProduct: async (req, res) => {
    const id = req.params.id;  // Obtener el ID del producto favorito a eliminar
    try {
      const respuesta = await FavoriteProductModel.deleteOne({ _id: id });  // Eliminar el producto favorito de la base de datos
      res.send(respuesta);  // Enviar la respuesta al cliente
    } catch (error) {
      console.log("Error al eliminar el producto favorito:", error);
      res.status(500).send("Error al eliminar el producto favorito");
    }
  }
};
