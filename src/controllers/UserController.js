const UserModel = require("../models/usersModel.js");
const mongoose = require('mongoose');
const shoppingCartController = require("../controllers/ShoppingCartController");


module.exports = {
  // Crear un nuevo usuario
createUser: async (req, res) => {
  const body = req.body;

  // Asignar valores por defecto si no se proporcionan
  if (!body.photo_url) {
    body.photo_url = "https://i.pinimg.com/736x/94/36/30/943630357dd6f3662a19b347474cb350.jpg"; // Imagen por defecto
  }

  if (!body.role_id) {
    body.role_id = "684ce7c896b90fefc2c70dff"; // ID de rol por defecto
  }

  try {
    // Crear el usuario en la base de datos
    const user = await UserModel.create(body);

    // Crear un carrito vacío para el usuario
    await shoppingCartController.createShoppingCart({
      body: { user_id: user._id, products: [] },  // Enviar un carrito vacío
    }, res);  // No enviar respuesta aquí

    // Responder solo con el ID del usuario
    res.send({ userId: user._id });  // Solo devolver el ID del usuario creado
  } catch (error) {
    console.log("Error al crear el usuario:", error);
    res.status(500).send("Error al crear el usuario");
  }
},



  loginUser: async (req, res) => {
    const { email, password_hash } = req.body;

    try {
      // Buscar el usuario por su email
      const user = await UserModel.findOne({ email });

      if (!user) {
        return res.status(400).send("Correo electrónico o contraseña incorrectos");
      }

      // Verificar que la contraseña coincida (sin cifrado)
      if (user.password_hash !== password_hash) {
        return res.status(400).send("Correo electrónico o contraseña incorrectos");
      }

      // Si las credenciales son correctas, devolver el usuario completo (sin la contraseña)
      const { password_hash: _, ...userWithoutPassword } = user.toObject();

      res.send(userWithoutPassword);
    } catch (error) {
      console.error("Error al intentar iniciar sesión:", error);
      res.status(500).send("Error al iniciar sesión");
    }
  },

  // Obtener todos los usuarios
  getAllUsers: async (req, res) => {
    try {
      const respuesta = await UserModel.find({});  // Obtener todos los usuarios de la base de datos
      res.send(respuesta);  // Enviar la respuesta al cliente
    } catch (error) {
      console.log("Error al obtener los usuarios:", error);
      res.status(500).send("Error al obtener los usuarios");
    }
  },

  // Actualizar un usuario por su ID
  updateUser: async (req, res) => {
    const body = req.body;
    const id = req.params.id;  // Obtener el ID del usuario a actualizar
    try {
      const respuesta = await UserModel.findOneAndUpdate({ _id: id }, body, { new: true });
      res.send(respuesta);  // Enviar la respuesta al cliente
    } catch (error) {
      console.log("Error al actualizar el usuario:", error);
      res.status(500).send("Error al actualizar el usuario");
    }
  },

  // Eliminar un usuario por su ID
  deleteUser: async (req, res) => {
    const id = req.params.id;  // Obtener el ID del usuario a eliminar
    try {
      const respuesta = await UserModel.deleteOne({ _id: id });  // Eliminar el usuario de la base de datos
      res.send(respuesta);  // Enviar la respuesta al cliente
    } catch (error) {
      console.log("Error al eliminar el usuario:", error);
      res.status(500).send("Error al eliminar el usuario");
    }
  },

  addCard: async (req, res) => {
    const { user_id, card_number, card_type } = req.body;

    // Validar que el user_id y los detalles de la tarjeta sean proporcionados
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      return res.status(400).send("Invalid user_id format");
    }
    
    if (!card_number || !card_type) {
      return res.status(400).send("Card details (card_number, card_type) are required");
    }

    try {
      // Buscar al usuario por su ID
      const user = await UserModel.findById(user_id);
      
      if (!user) {
        return res.status(404).send("User not found");
      }

      // Crear el objeto tarjeta
      const newCard = {
        card_id: mongoose.Types.ObjectId(),
        card_number,
        card_type,
      };

      // Añadir la tarjeta al array de tarjetas del usuario
      user.cards.push(newCard);

      // Guardar el usuario con la nueva tarjeta
      await user.save();

      res.status(200).send("Card added successfully");
    } catch (error) {
      console.log("Error al añadir tarjeta:", error);
      res.status(500).send("Error al añadir tarjeta");
    }
  },

  addAddress: async (req, res) => {
    const { user_id, full_address, is_default } = req.body;

    // Validar que el user_id y los detalles de la dirección sean proporcionados
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      return res.status(400).send("Invalid user_id format");
    }

    if (!full_address) {
      return res.status(400).send("Full address is required");
    }

    try {
      // Buscar al usuario por su ID
      const user = await UserModel.findById(user_id);
      
      if (!user) {
        return res.status(404).send("User not found");
      }

      // Crear el objeto dirección
      const newAddress = {
        address_id: mongoose.Types.ObjectId(),
        full_address,
        is_default: is_default || false, // Si no se proporciona, por defecto será false
      };

      // Añadir la dirección al array de direcciones del usuario
      user.addresses.push(newAddress);

      // Guardar el usuario con la nueva dirección
      await user.save();

      res.status(200).send("Address added successfully");
    } catch (error) {
      console.log("Error al añadir dirección:", error);
      res.status(500).send("Error al añadir dirección");
    }
  },

  getUserById: async (req, res) => {
    const userId = req.params.userId;  // Obtener el ID del usuario de los parámetros de la URL

    try {
      // Buscar al usuario por su ID
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).send('Usuario no encontrado');
      }
      res.send(user);  // Enviar la respuesta con el usuario encontrado
    } catch (error) {
      console.log("Error al obtener el usuario:", error);
      res.status(500).send("Error al obtener el usuario");
    }
  },


  // Obtener todas las direcciones de un usuario por su ID
getUserAddresses: async (req, res) => {
  const userId = req.params.userId;  // Obtener el ID del usuario de los parámetros de la URL

  try {
    // Buscar el usuario por ID y extraer solo las direcciones
    const user = await UserModel.findById(userId, 'addresses'); // Solo traer las direcciones
    if (!user) {
      return res.status(404).send('Usuario no encontrado');
    }
    res.send(user.addresses);  // Enviar las direcciones del usuario
  } catch (error) {
    console.log("Error al obtener las direcciones del usuario:", error);
    res.status(500).send("Error al obtener las direcciones del usuario");
  }
},
// Obtener todas las tarjetas de un usuario por su ID
getUserCards: async (req, res) => {
  const userId = req.params.userId;  // Obtener el ID del usuario de los parámetros de la URL

  try {
    // Buscar el usuario por ID y extraer solo las tarjetas
    const user = await UserModel.findById(userId, 'cards'); // Solo traer las tarjetas
    if (!user) {
      return res.status(404).send('Usuario no encontrado');
    }
    res.send(user.cards);  // Enviar las tarjetas del usuario
  } catch (error) {
    console.log("Error al obtener las tarjetas del usuario:", error);
    res.status(500).send("Error al obtener las tarjetas del usuario");
  }}

};
