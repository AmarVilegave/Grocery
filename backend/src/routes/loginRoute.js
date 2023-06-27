const { UserModel } = require("../models/userModel");
const { AdminModel } = require("../models/adminModel");
const jwt = require("jsonwebtoken");
const config = require("config");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await UserModel.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("invalid email or password");

  const token = user.generateAuthToken();

  const userData = {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    mobileNo: user.mobileNo,
    addresses: user.addresses,
  };

  console.log("userData :", userData);

  res.setHeader("Access-Control-Expose-Headers", "*");
  res.setHeader("x-auth-token", token);
  return res.status(200).send(userData);
});

router.post("/admin-login", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let admin = await AdminModel.findOne({ email: req.body.email });
  if (!admin) return res.status(400).send("Invalid email or password");

  const validPassword = await bcrypt.compare(req.body.password, admin.password);
  if (!validPassword) return res.status(400).send("invalid email or password");

  const token = admin.generateAuthToken();

  const adminData = {
    _id: admin._id,
    fullName: admin.fullName,
    email: admin.email,
    mobileNo: admin.mobileNo,
    role: admin.role,
  };

  console.log("adminData :", adminData);

  res.setHeader("Access-Control-Expose-Headers", "*");
  res.setHeader("x-auth-token", token).send(adminData);
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(8).max(1024).required(),
  });
  return schema.validate(req);
}

module.exports = router;
