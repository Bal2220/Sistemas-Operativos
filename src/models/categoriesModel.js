const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true }
}, { versionKey: false });

const ModelCategory = mongoose.model("Category", categorySchema);
module.exports = ModelCategory
