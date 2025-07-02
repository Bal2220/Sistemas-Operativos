const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  full_address: String,
  is_default: Boolean
});

const cardSchema = new mongoose.Schema({
  card_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true, // Asegúrate de que cada tarjeta tenga un ID único
  },
  card_number: {
    type: String,
    required: true,
  },
  card_type: {
    type: String,
    required: true, // Ejemplo: 'Visa', 'MasterCard', etc.
  },
  expiration_month_year: {
    type: String,
    required: true,
    validate: {
      validator: function(value) {
        return /^\d{2}\/\d{2}$/.test(value); // Formato MM/AA
      },
      message: 'El formato de la fecha de expiración debe ser MM/AA',
    },
  },
  cvv: {
    type: String,
    required: true,
    validate: {
      validator: function(value) {
        return /^[0-9]{3,4}$/.test(value); // CVV debe ser 3 o 4 dígitos
      },
      message: 'El CVV debe contener 3 o 4 dígitos',
    },
  },
  cardholder_name: {
    type: String,
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password_hash: { type: String, required: true },
  is_verified: { type: Boolean },
  photo_url: { type: String, default: "https://i.pinimg.com/736x/94/36/30/943630357dd6f3662a19b347474cb350.jpg" },
  role_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', default: mongoose.Types.ObjectId("684ce7c896b90fefc2c70dff") },
  addresses: [addressSchema],
  cards: [cardSchema]
}, { timestamps: true, versionKey: false });

const ModelUser = mongoose.model("User", userSchema);
module.exports = ModelUser
