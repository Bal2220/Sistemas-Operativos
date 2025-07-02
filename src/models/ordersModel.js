const mongoose = require("mongoose");

const orderProductSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  quantity: { type: Number, required: true },
  unit_price: { type: mongoose.Schema.Types.Decimal128, required: true },
  total_amount: { type: mongoose.Schema.Types.Decimal128, required: true }
}, { _id: false });

const shippingAddressSchema = new mongoose.Schema({
  address_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  full_address: { type: String, required: true },
}, { _id: false });

const paymentSummarySchema = new mongoose.Schema({
  card_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  last_digits: { type: String, required: true }
}, { _id: false });

const orderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  products: [orderProductSchema],
  total_amount: { type: mongoose.Schema.Types.Decimal128, required: true },
  shipping_address: { type: shippingAddressSchema, required: true },
  payment_summary: { type: paymentSummarySchema, required: true },
  status: { type: String, default: 'PENDING' },
  delivery_date: { type: Date, required: true },
  created_at: { type: Date, default: Date.now },
}, { versionKey: false });

const ModelOrder = mongoose.model("Order", orderSchema);
module.exports = ModelOrder;
