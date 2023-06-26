const Joi = require("joi");
const mongoose = require("mongoose");
const { categorySchema } = require("./categoryModel");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 50 },
  category: { type: categorySchema, required: true },
  price: {
    type: Number,
    required: true,
    get: (v) => Math.round(v),
    set: (v) => Math.round(v),
  },
  weight: { type: String, required: true },
  quantity: { type: String, required: true },
  image: { type: [String], optional: true },
  description: { type: String, optional: true },
  date: { type: Date, required: true, default: Date.now },
});

const Product = mongoose.model("Product", productSchema);

function validateProduct(product) {
  const schema = Joi.object({
    name: Joi.string().required(),
    categoryId: Joi.string().required(),
    price: Joi.number().min(1).required(),
    weight: Joi.string().required(),
    quantity: Joi.number().required(),
    image: Joi.array().items(Joi.string().optional()),
    description: Joi.string().optional(),
  });
  return schema.validate(product);
}

exports.productSchema = productSchema;
exports.Product = Product;
exports.validate = validateProduct;
