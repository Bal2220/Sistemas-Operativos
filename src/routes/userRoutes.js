const express = require("express");
const router = express.Router();

// Importamos el controlador de usuarios
const userController = require("../controllers/UserController");

// Rutas para manejar las operaciones CRUD de User
router.post("/",userController.createUser); 
router.get("/ls", userController.getAllUsers); 
router.put("/:id", userController.updateUser); 
router.delete("/:id", userController.deleteUser); 
router.post("/login", userController.loginUser); 
router.post("/add-card", userController.addCard);
router.post("/add-address", userController.addAddress);

module.exports = router;
