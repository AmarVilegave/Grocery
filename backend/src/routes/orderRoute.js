const { validate, OrderModel } = require("../models/orderModel");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const orders = await OrderModel.find();
  res.send(orders);
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let order = new OrderModel({
    user: req.body.user,
    cart: req.body.cart,
    paymentMode: req.body.paymentMode,
  });
  console.log("backend order :", order);
  order = await order.save();
  console.log("backend order :", order);
  res.send(order);
});

router.get("/:email", async (req, res) => {
  console.log('req.params.email',req.params.email)
  const order = await OrderModel.find({"user.email":req.params.email});
  console.log('user order', order)

  if (!order)
    return res.status(400).send("The Order with the given ID was not found");

  res.send(order);
});

router.get("/id/:id", async (req, res) => {
  const order = await OrderModel.findById(req.params.id);
  console.log('user order', order)

  if (!order)
    return res.status(400).send("The Order with the given ID was not found");

  res.send(order);
});

module.exports = router;
