const express = require("express");
const router = express.Router();

// Importamos el controlador de reseñas
const reviewController = require("../controllers/ReviewController");

// Rutas para manejar las operaciones CRUD de Review
router.post("/", reviewController.createReview);  // Crear una nueva reseña
router.put("/:id", reviewController.updateReview);  // Actualizar una reseña por su id
router.delete("/:id", reviewController.deleteReview);  // Eliminar una reseña por su id
router.get("/:product_id", reviewController.getAllReviewsByProductId);

module.exports = router;
