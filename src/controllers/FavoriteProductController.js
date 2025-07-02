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
