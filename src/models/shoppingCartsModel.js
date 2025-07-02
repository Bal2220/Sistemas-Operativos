const mongoose = require("mongoose");

const cartProductSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  quantity: { type: Number, required: true },
  price: { type: mongoose.Schema.Types.Decimal128, required: true } 
}, { _id: false });

const shoppingCartSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  products: [cartProductSchema]
}, { versionKey: false, collection: "shopping_carts" });

const ModelShoppingCarts = mongoose.model("Shopping_Carts", shoppingCartSchema);
module.exports = ModelShoppingCarts


 