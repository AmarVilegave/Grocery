const {
    validate,
    UserModel,
    validateAddress,
    validateWishlist,
  } = require("../models/userModel");
  const jwt = require("jsonwebtoken");
  const config = require("config");
  const bcrypt = require("bcrypt");
  const _ = require("lodash");
  const express = require("express");
  const router = express.Router();
  
  router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    const { fullName, email, password, mobileNo, dateOfBirth } = req.body;
  
    const user = await UserModel.findOne({ email });
    if (user) {
      res.status(400).send("This EmailID is already registered");
      return;
    }
  
    let newUser = new UserModel({
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password,
      mobileNo: req.body.mobileNo,
      dateOfBirth: req.body.dateOfBirth,
    });
  
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
  
    newUser = await newUser.save();
  
    const token = newUser.generateAuthToken();
    res.setHeader("Access-Control-Expose-Headers", "*");
    res.setHeader("x-auth-token", token).send(newUser);
  });
  
  router.put("/:id", async (req, res) => {
    const { error } = validateAddress(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const user = await UserModel.updateOne(
      { _id: req.params.id },
      {
        $push: {
          addresses: req.body,
        },
      }
    );
    if (!user)
      return res.status(404).send("The user with given ID was not found");
  
    res.send(user);
  });
  
  router.put("/favorite/:id", async (req, res) => {
    const { error } = validateWishlist(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    const userObject = await UserModel.findById(req.params.id);
    let user;
    let productExists = false;
    userObject.wishlist.forEach((product) => {
      if (product._id.toString() === req.body._id) {
        productExists = true;
      }
    });
    if (!productExists) {
      user = await UserModel.updateOne(
        { _id: req.params.id },
        {
          $push: {
            wishlist: req.body,
          },
        }
      );
    } else {
      user = await UserModel.updateOne(
        { _id: req.params.id },
        {
          $pull: {
            wishlist: { _id: req.body._id },
          },
        }
      );
    }
  
    if (!user)
      return res.status(404).send("The user with given ID was not Found");
  
    return res.status(200).send({ message: "Successfully Updated!" });
  });
  
  router.get("/verifyToken", async (req, res) => {
    const decode = jwt.verify(
      req.query["token"].replace(/['"]+/g, ""),
      config.get("jwtPrivateKey"),
      (error, result) => {
        if (error) {
          return res.json({
            error: { name: error.name, message: error.message },
          });
        }
        return res.json({
          result: result,
        });
      }
    );
  });
  
  router.get("/favorite/:id", async (req, res) => {
    const user = await UserModel.findById(req.params.id);
    let wishlist;
    if (user) {
      wishlist = user.wishlist;
    }
    if (!user)
      return res.status(404).send("The user with given ID was not Found");
  
    res.send(wishlist);
  });
  
  module.exports = router;
  