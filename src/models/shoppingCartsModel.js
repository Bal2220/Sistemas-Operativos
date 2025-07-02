const mongoose = require("mongoose");

const cartProductSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  quantity: { type: Number, required: true }
}, { _id: false });

const shoppingCartSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  products: [cartProductSchema]
}, { versionKey: false });

const ModelShoppingCarts = mongoose.model("ShoppingCart", shoppingCartSchema);
module.exports = ModelShoppingCarts
