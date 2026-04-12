const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  code: { type: String, required: true },
  language: { type: String, default: "javascript" },
  review: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Review", reviewSchema);
