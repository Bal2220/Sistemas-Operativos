const mongoose = require("mongoose");

const favoriteProductSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  product_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  created_at: { type: Date, required: true }
}, { versionKey: false , collection: "favorite_products" });

const ModelFavoriteProduct = mongoose.model("Favorite_Product", favoriteProductSchema);
module.exports = ModelFavoriteProduct
