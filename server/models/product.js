const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema(
  {
    seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    images: {
      type: Array,
    },
    category: {
      type: Number,
    },
    period: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = { Product };
