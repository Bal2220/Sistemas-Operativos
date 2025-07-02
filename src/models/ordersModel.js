const mongoose = require("mongoose");

const orderProductSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  quantity: { type: Number, required: true }
}, { _id: false });

const orderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  products: [orderProductSchema],
  total_amount: { type: mongoose.Schema.Types.Decimal128, required: true },
  full_address: { type: String, required: true },
  status: String,
  delivery_date: Date,
  created_at: { type: Date, required: true }
}, { versionKey: false });

const ModelOrder = mongoose.model("Order", orderSchema);
module.exports = ModelOrder
