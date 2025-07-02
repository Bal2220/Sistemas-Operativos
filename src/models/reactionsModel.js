const mongoose = require("mongoose");

const reactionSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  review_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  created_at: { type: Date, required: true }
}, { versionKey: false });

const ModelReactions = mongoose.model("Reaction", reactionSchema);
module.exports = ModelReactions
