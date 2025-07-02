const express = require("express");
const router = express.Router();

// Importamos el controlador de productos
const productController = require("../controllers/ProductController");

// Rutas para manejar las operaciones CRUD de Product
router.post("/", productController.createProduct);  // Crear un nuevo producto
router.get("/ls", productController.getAllProducts);  // Obtener todos los productos
router.put("/:id", productController.updateProduct);  // Actualizar un producto por su id
router.delete("/:id", productController.deleteProduct);  // Eliminar un producto por su id

module.exports = router;
