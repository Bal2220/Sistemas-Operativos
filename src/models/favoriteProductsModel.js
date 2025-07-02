const mongoose = require("mongoose");

const favoriteProductSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  product_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  created_at: { type: Date, required: true }
}, { versionKey: false });

const ModelFavoriteProduct = mongoose.model("FavoriteProduct", favoriteProductSchema);
module.exports = ModelFavoriteProduct
