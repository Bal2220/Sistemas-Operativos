const ProductModel = require("../models/productsModel");

module.exports = {
  // Crear un nuevo producto
  createProduct: async (req, res) => {
    const body = req.body;
    try {
      const respuesta = await ProductModel.create(body);  // Crear el producto en la base de datos
      res.send(respuesta);  // Enviar la respuesta al cliente
    } catch (error) {
      console.log("Error al crear el producto:", error);
      res.status(500).send("Error al crear el producto");
    }
  },

  // Obtener todos los productos
  getAllProducts: async (req, res) => {
    try {
      const respuesta = await ProductModel.find({});  // Obtener todos los productos de la base de datos
      res.send(respuesta);  // Enviar la respuesta al cliente
    } catch (error) {
      console.log("Error al obtener los productos:", error);
      res.status(500).send("Error al obtener los productos");
    }
  },

  // Actualizar un producto por su ID
  updateProduct: async (req, res) => {
    const body = req.body;
    const id = req.params.id;  // Obtener el ID del producto a actualizar
    try {
      const respuesta = await ProductModel.findOneAndUpdate({ _id: id }, body, { new: true });
      res.send(respuesta);  // Enviar la respuesta al cliente
    } catch (error) {
      console.log("Error al actualizar el producto:", error);
      res.status(500).send("Error al actualizar el producto");
    }
  },

  // Eliminar un producto por su ID
  deleteProduct: async (req, res) => {
    const id = req.params.id;  // Obtener el ID del producto a eliminar
    try {
      const respuesta = await ProductModel.deleteOne({ _id: id });  // Eliminar el producto de la base de datos
      res.send(respuesta);  // Enviar la respuesta al cliente
    } catch (error) {
      console.log("Error al eliminar el producto:", error);
      res.status(500).send("Error al eliminar el producto");
    }
  }
};
