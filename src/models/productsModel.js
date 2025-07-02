const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: mongoose.Schema.Types.Decimal128, required: true },
  description: String,
  category_ids: [{ type: mongoose.Schema.Types.ObjectId, required: true }],
  available: { type: Boolean, required: true }
}, { versionKey: false });

const ModelProduct = mongoose.model("Product", productSchema);
module.exports = ModelProduct
