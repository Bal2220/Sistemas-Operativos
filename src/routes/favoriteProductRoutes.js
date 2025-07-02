const express = require("express");
const router = express.Router();

// Importamos el controlador de productos favoritos
const favoriteProductController = require("../controllers/FavoriteProductController");

// Rutas para manejar las operaciones CRUD de Favorite Product
router.post("/", favoriteProductController.createFavoriteProduct);  // Crear un nuevo producto favorito
router.get("/ls", favoriteProductController.getAllFavoriteProducts);  // Obtener todos los productos favoritos
router.put("/:id", favoriteProductController.updateFavoriteProduct);  // Actualizar un producto favorito por su id
router.delete("/:id", favoriteProductController.deleteFavoriteProduct);  // Eliminar un producto favorito por su id

module.exports = router;
