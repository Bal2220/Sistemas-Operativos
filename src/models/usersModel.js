const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  full_address: String,
  is_default: Boolean
});

const cardSchema = new mongoose.Schema({
  card_id: mongoose.Schema.Types.ObjectId,
  card_number: String,
  card_type: String
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
