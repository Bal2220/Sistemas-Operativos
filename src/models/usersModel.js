const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  address_id: mongoose.Schema.Types.ObjectId,
  full_address: String,
  is_default: Boolean
}, { _id: false });

const cardSchema = new mongoose.Schema({
  card_id: mongoose.Schema.Types.ObjectId,
  card_number: String,
  card_type: String
}, { _id: false });

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  is_verified: { type: Boolean },
  addresses: [addressSchema],
  cards: [cardSchema]
}, { timestamps: true, versionKey: false });

const ModelUser = mongoose.model("User", userSchema);
module.exports = ModelUser
