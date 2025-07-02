
const CategoryModel = require("../models/categoriesModel.js");

module.exports = {
  // Crear una nueva categoría
  createCategory: async (req, res) => {
    const body = req.body;
    try {
      const respuesta = await CategoryModel.create(body);  // Crear la categoría en la base de datos
      res.send(respuesta);  // Enviar la respuesta al cliente
    } catch (error) {
      console.log("Error al crear la categoría:", error);
      res.status(500).send("Error al crear la categoría");
    }
  },

  // Obtener todas las categorías
  getAllCategories: async (req, res) => {
    try {
      const respuesta = await CategoryModel.find({});  // Obtener todas las categorías de la base de datos
      res.send(respuesta);  // Enviar la respuesta al cliente
    } catch (error) {
      console.log("Error al obtener las categorías:", error);
      res.status(500).send("Error al obtener las categorías");
    }
  },

  // Actualizar una categoría por su ID
  updateCategory: async (req, res) => {
    const body = req.body;
    const id = req.params.id;  // Obtener el ID de la categoría a actualizar
    try {
      const respuesta = await CategoryModel.findOneAndUpdate({ _id: id }, body, { new: true });
      res.send(respuesta);  // Enviar la respuesta al cliente
    } catch (error) {
      console.log("Error al actualizar la categoría:", error);
      res.status(500).send("Error al actualizar la categoría");
    }
  },

  // Eliminar una categoría por su ID
  deleteCategory: async (req, res) => {
    const id = req.params.id;  // Obtener el ID de la categoría a eliminar
    try {
      const respuesta = await CategoryModel.deleteOne({ _id: id });  // Eliminar la categoría de la base de datos
      res.send(respuesta);  // Enviar la respuesta al cliente
    } catch (error) {
      console.log("Error al eliminar la categoría:", error);
      res.status(500).send("Error al eliminar la categoría");
    }
  }
};