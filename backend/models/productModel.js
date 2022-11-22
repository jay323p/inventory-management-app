const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'Please provide name of product'],
      trim: true,
    },
    sku: {
      type: String,
      required: true,
      default: 'SKU',
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Please provide a category for the product'],
    },
    quantity: {
      type: String,
      required: [true, 'Please provide quanity of product'],
      trim: true,
    },
    price: {
      type: String,
      required: [true, 'Please provide price of product'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide image of product'],
      trim: true,
    },
    image: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
