const mongoose = require("mongoose");

const reviewCommentSchema = new mongoose.Schema({
  review_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  parent_id: { type: mongoose.Schema.Types.ObjectId, default: null },
  comment: { type: String, required: true },
  created_at: { type: Date, required: true }
}, { versionKey: false });

const ModelReviewComment = mongoose.model("ReviewComment", reviewCommentSchema);
module.exports = ModelReviewComment
