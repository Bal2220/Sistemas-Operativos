const mongoose = require('mongoose');
const OrderModel = require("../models/ordersModel");

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

module.exports = {
  // Crear una nueva orden
  createOrder: async (req, res) => {
    const { user_id, products, shipping_address, payment_summary, total_amount, delivery_date, status, created_at } = req.body;

    // Validar el formato de las IDs en los productos
    const formattedProducts = products.map((product) => {
      if (!isValidObjectId(product.product_id)) {
        return res.status(400).send("Invalid product_id format");
      }
      return {
        ...product,
        product_id: mongoose.Types.ObjectId(product.product_id), // Convertir product_id a ObjectId
      };
    });

    // Validar la dirección de envío
    if (!isValidObjectId(shipping_address.address_id)) {
      return res.status(400).send("Invalid address_id format");
    }

    const formattedShippingAddress = {
      ...shipping_address,
      address_id: mongoose.Types.ObjectId(shipping_address.address_id), // Convertir address_id a ObjectId
    };

    // Validar la tarjeta de pago
    if (!isValidObjectId(payment_summary.card_id)) {
      return res.status(400).send("Invalid card_id format");
    }

    const formattedPaymentSummary = {
      ...payment_summary,
      card_id: mongoose.Types.ObjectId(payment_summary.card_id), // Convertir card_id a ObjectId
    };

    // Validar la ID del usuario
    if (!isValidObjectId(user_id)) {
      return res.status(400).send("Invalid user_id format");
    }

    try {
      const order = await OrderModel.create({
        user_id: mongoose.Types.ObjectId(user_id), // Convertir user_id a ObjectId
        products: formattedProducts,
        shipping_address: formattedShippingAddress,
        payment_summary: formattedPaymentSummary,
        total_amount: total_amount,
        delivery_date: delivery_date,
        status: status || 'PENDING', // Si no se pasa, por defecto será 'PENDING'
        created_at: created_at || new Date(),
      });

      res.send(order);
    } catch (error) {
      console.log("Error al crear la orden:", error);
      res.status(500).send("Error al crear la orden");
    }
  },

  // Obtener todas las órdenes
  getAllOrders: async (req, res) => {
    try {
      const respuesta = await OrderModel.find({}); // Obtener todas las órdenes
      res.send(respuesta); // Enviar la respuesta
    } catch (error) {
      console.log("Error al obtener las órdenes:", error);
      res.status(500).send("Error al obtener las órdenes");
    }
  },

  // Obtener todas las órdenes de un usuario por su ID
getOrdersByUserId: async (req, res) => {
  const userId = req.params.userId;  // Obtener el ID del usuario desde los parámetros de la URL

  try {
    const respuesta = await OrderModel.find({ user_id: userId });  // Buscar todas las órdenes del usuario
    if (!respuesta || respuesta.length === 0) {
      return res.status(404).send("No se encontraron órdenes para este usuario.");
    }
    res.send(respuesta);  // Enviar las órdenes del usuario
  } catch (error) {
    console.log("Error al obtener las órdenes del usuario:", error);
    res.status(500).send("Error al obtener las órdenes del usuario");
  }
},

  // Actualizar una orden por su ID
  updateOrder: async (req, res) => {
    const id = req.params.id; // Obtener el ID de la orden a actualizar
    const body = req.body;

    try {
      const respuesta = await OrderModel.findOneAndUpdate({ _id: id }, body, { new: true });
      res.send(respuesta); // Enviar la respuesta
    } catch (error) {
      console.log("Error al actualizar la orden:", error);
      res.status(500).send("Error al actualizar la orden");
    }
  },

  // Eliminar una orden por su ID
  deleteOrder: async (req, res) => {
    const id = req.params.id; // Obtener el ID de la orden a eliminar

    try {
      const respuesta = await OrderModel.deleteOne({ _id: id }); // Eliminar la orden
      res.send(respuesta); // Enviar la respuesta
    } catch (error) {
      console.log("Error al eliminar la orden:", error);
      res.status(500).send("Error al eliminar la orden");
    }
  }
};
