const ReviewModel = require("../models/reviewModel");

module.exports = {
  // Crear una nueva reseña
  createReview: async (req, res) => {
    const body = req.body;
    try {
      const respuesta = await ReviewModel.create(body);  // Crear la reseña en la base de datos
      res.send(respuesta);  // Enviar la respuesta al cliente
    } catch (error) {
      console.log("Error al crear la reseña:", error);
      res.status(500).send("Error al crear la reseña");
    }
  },

  // Obtener todas las reseñas
 getAllReviewsByProductId: async (req, res) => {
    const { product_id } = req.params;  // Obtener el product_id desde los parámetros de la URL

    try {
      // Buscar todas las reseñas asociadas al product_id
      const reviews = await ReviewModel.find({ product_id });

      if (reviews.length === 0) {
        return res.status(404).send("No se encontraron reseñas para este producto.");
      }

      // Enviar la respuesta con las reseñas encontradas
      res.send(reviews);
    } catch (error) {
      console.log("Error al obtener las reseñas del producto:", error);
      res.status(500).send("Error al obtener las reseñas del producto.");
    }
  },

  // Actualizar una reseña por su ID
  updateReview: async (req, res) => {
    const body = req.body;
    const id = req.params.id;  // Obtener el ID de la reseña a actualizar
    try {
      const respuesta = await ReviewModel.findOneAndUpdate({ _id: id }, body, { new: true });
      res.send(respuesta);  // Enviar la respuesta al cliente
    } catch (error) {
      console.log("Error al actualizar la reseña:", error);
      res.status(500).send("Error al actualizar la reseña");
    }
  },

  // Eliminar una reseña por su ID
  deleteReview: async (req, res) => {
    const id = req.params.id;  // Obtener el ID de la reseña a eliminar
    try {
      const respuesta = await ReviewModel.deleteOne({ _id: id });  // Eliminar la reseña de la base de datos
      res.send(respuesta);  // Enviar la respuesta al cliente
    } catch (error) {
      console.log("Error al eliminar la reseña:", error);
      res.status(500).send("Error al eliminar la reseña");
    }
  }
};
