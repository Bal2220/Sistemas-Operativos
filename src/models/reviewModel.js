const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  product_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  created_at: { type: Date, required: true },
  additional_photos: [String],
  likes_count: Number
}, { versionKey: false });

const ModelReview = mongoose.model("Review", reviewSchema);
module.exports = ModelReview
