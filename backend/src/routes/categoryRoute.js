const { Category, validate } = require("../models/categoryModel");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const categories = await Category.find().sort("name");
  res.send(categories);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let category = new Category({
    category: req.body.category,
    tag: req.body.tag,
    categoryImg: req.body.categoryImg,
    tagImg: req.body.tagImg,
  });

  category = await category.save();
  res.send(category);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.updateOne(
    { _id: req.params.id },
    { category: req.body.category, tag: req.body.tag }
  );

  if (!category)
    return res.status(404).send("The category with the given ID was not found");

  res.send(category);
});

router.delete("/:id", async (req, res) => {
  const category = await Category.findByIdAndRemove(req.params.id);
  if (!category)
    return res.status(404).send("The category with the given Id was not found");

  res.send(category);
});

router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category)
    return res.status(404).send("The category with the given ID was not found");

  res.send(category);
});

router.get("/search/:searchTerm", async (req, res) => {
  const searchRegex = new RegExp(req.params.searchTerm, "i");
  const categories = await Category.find({
    category: { $regex: searchRegex },
    tag: { $regex: searchRegex },
  });
  res.send(categories);
});

module.exports = router;
