const express = require("express");
const router = express.Router();

// Importamos el controlador de categorías
const categoryController = require("../controllers/CategoryController");

// Rutas para manejar las operaciones CRUD de Category
router.post("/categories", categoryController.createCategory);  // Crear una nueva categoría
router.get("/ls", categoryController.getAllCategories);  // Obtener todas las categorías
router.put("/:id", categoryController.updateCategory);  // Actualizar una categoría por su id
router.delete("/:id", categoryController.deleteCategory);  // Eliminar una categoría por su id

module.exports = router;
