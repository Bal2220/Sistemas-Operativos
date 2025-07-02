const mongoose = require("mongoose");

const sessionTokenSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  token: { type: String, required: true },
  expires_at: { type: Date, required: true },
  valid: Boolean
}, { versionKey: false });

const ModelSessionToken = mongoose.model("SessionToken", sessionTokenSchema);
module.exports = ModelSessionToken
