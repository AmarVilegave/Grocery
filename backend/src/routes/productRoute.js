const { Product, validate } = require("../models/product");
const { Category } = require("../models/category");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const products = await Product.find().sort("name");
  // console.log(products);
  res.send(products);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(404).send("Invalid Category..");

  let product = new Product({
    name: req.body.name,
    category: {
      _id: category._id,
      category: category.category,
      tag: category.tag,
    },
    price: req.body.price,
    weight: req.body.weight,
    quantity: req.body.quantity,
    image: req.body.image,
    description: req.body.description,
  });

  product = await product.save();
  res.send(product);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(404).send("Invalid Category..");

  const product = await Product.updateOne(
    { _id: req.params.id },
    {
      name: req.body.name,
      category: {
        _id: category._id,
        category: category.category,
        tag: category.tag,
      },
      price: req.body.price,
      weight: req.body.weight,
      quantity: req.body.quantity,
      image: req.body.image,
      description: req.body.description,
    }
  );
  if (!product)
    return res.status(404).send("The product with the given ID was not found");

  res.send(product);
});

router.delete("/:id", async (req, res) => {
  const product = await Product.findByIdAndRemove(req.params.id);

  if (!product)
    return res.status(404).send("The product with the given ID was not found");

  res.send(product);
});

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product)
    return res.status(404).send("The product with given ID was not found");
  res.send(product);
});

router.get("/:tag", async (req, res) => {
  const product = await Product.find(req.params.category.tag);
  if (!product)
    return res.status(404).send("The product with given Tag was not found");
  res.send(product);
});



router.get("/search/:searchTerm", async (req, res) => {
  const searchRegex = new RegExp(req.params.searchTerm, "i");
  const product = await Product.find({
    name: { $regex: searchRegex },
  });
  res.send(product);
});

module.exports = router;
