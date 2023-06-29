const { validate, AdminModel } = require("../models/adminModel");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const { email } = req.body;

  const admin = await AdminModel.findOne({ email });
  if (admin) {
    res.status(400).send("Admin already exist");
    return;
  }

  newAdmin = new AdminModel({
    fullName: req.body.fullName,
    email: req.body.email,
    password: req.body.password,
    mobileNo: req.body.mobileNo,
    role: req.body.role,
  });

  const salt = await bcrypt.genSalt(10);
  newAdmin.password = await bcrypt.hash(newAdmin.password, salt);

  newAdmin = await newAdmin.save();

  res.send(newAdmin);
});

module.exports = router;
