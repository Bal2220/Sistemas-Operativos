const express = require("express");
const router = express.Router();

// Importamos el controlador de carrito de compras
const shoppingCartController = require("../controllers/ShoppingCartController");

// Rutas para manejar las operaciones CRUD de Shopping Cart
router.post("/", shoppingCartController.createShoppingCart);  // Crear un nuevo carrito
router.get("/ls", shoppingCartController.getAllShoppingCarts);  // Obtener todos los carritos
router.put("/user/:userId", shoppingCartController.updateShoppingCart);
router.delete("/:id", shoppingCartController.deleteShoppingCart);  // Eliminar un carrito por su id
router.get("/user/:userId", shoppingCartController.getShoppingCartByUserId); // Obtener carrito por usuario
router.put("/empty/:userId", shoppingCartController.emptyShoppingCart);  // Nueva ruta para vaciar el carrito
router.put("/remove_products/:userId", shoppingCartController.removeProductsFromCart);

module.exports = router;
