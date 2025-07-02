const express = require("express");
const router = express.Router();

// Importamos el controlador de órdenes
const orderController = require("../controllers/OrderController");

// Rutas para manejar las operaciones CRUD de Order
router.post("/", orderController.createOrder);  // Crear una nueva orden
router.get("/ls", orderController.getAllOrders);  // Obtener todas las órdenes
router.put("/:id", orderController.updateOrder);  // Actualizar una orden por su id
router.delete("/:id", orderController.deleteOrder);  // Eliminar una orden por su id
router.get("/user/:userId", orderController.getOrdersByUserId);

module.exports = router;
