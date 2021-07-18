const mongoose = require("mongoose");
const { PRODUCT_COLLECTION: PRODUCT_COLLECTION } = require("../utils/constants").collections;
const { ObjectId, Number } = mongoose.Schema.Types

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      unique: true,
    },
    productCount: {
      type: Number,
      unique: false,
    },
    productPrice: {
      type: String,
      unique: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(PRODUCT_COLLECTION, productSchema);
