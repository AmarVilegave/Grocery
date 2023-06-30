const Joi = require("joi");
const mongoose = require("mongoose");
const { productSchema } = require("./productModel");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  fullName: { type: String, minlength: 3, maxlength: 50, required: true },
  email: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: true,
    unique: true,
  },
  password: { type: String, minlength: 8, maxlength: 1024, required: true },
  mobileNo: { type: Number, minlength: 10, maxlength: 10, required: true },
  dateOfBirth: { type: Date, required: true },
  isAdmin: { type: Boolean, default: false, required: true },
  addresses: {
    type: [
      {
        address: { type: String, required: true },
        landmark: { type: String, required: true },
        state: { type: String, required: true },
        city: { type: String, required: true },
        pincode: { type: Number, minlength: 6, maxlength: 6, required: true },
      },
    ],
    optional: true,
  },
  wishlist: { type: [productSchema], optional: true },
  date: { type: Date, required: true, default: Date.now() },
});

const addressSchema = new mongoose.Schema({
  addresses: {
    type: [
      {
        address: { type: String, required: true },
        landmark: { type: String, required: true },
        state: { type: String, required: true },
        city: { type: String, required: true },
        pincode: { type: Number, minlength: 6, maxlength: 6, required: true },
      },
    ],
    optional: true,
  },
});

const wishlistSchema = new mongoose.Schema({
  whishlist: {
    type: [
      {
        _id: { type: String, required: true },
        name: { type: String, required: true, minlength: 2, maxlength: 50 },
        category: {
          type: {
            _id: { type: String, required: true },
            category: { type: String, required: true },
            tag: { type: String, required: true },
          },
        },
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
      },
    ],
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, config.get("jwtPrivateKey"));
  console.log(token);
  return token;
};

userSchema.methods.validateAuthToken = function (token) {
  const decode = jwt.verify(token, config.get("jwtPrivateKey"));
  console.log("decode :", decode);
};

const UserModel = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    fullName: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(8).max(1024).required(),
    mobileNo: Joi.number()
      .min(10 ** 9)
      .max(10 ** 10 - 1)
      .required(),
    dateOfBirth: Joi.date().required(),
    isAdmin: Joi.boolean().required(),
    addresses: Joi.array()
      .items(
        Joi.object().keys({
          address: Joi.string().required(),
          landmark: Joi.string().required(),
          state: Joi.string().required(),
          city: Joi.string().required(),
          pincode: Joi.number().required(),
        })
      )
      .optional(),
    wishlist: Joi.array()
      .items(
        Joi.object().keys({
          productId: Joi.string().required(),
        })
      )
      .optional(),
  });
  return schema.validate(user);
}

function validateAddress(userAddress) {
  const schema = Joi.object({
    address: Joi.string().required(),
    landmark: Joi.string().required(),
    state: Joi.string().required(),
    city: Joi.string().required(),
    pincode: Joi.number().required(),
  });
  return schema.validate(userAddress);
}

function validateWishlist(wishlist) {
  const schema = Joi.object({
    _id: Joi.string().required(),
    name: Joi.string().required(),
    category: Joi.object()
      .keys({
        _id: Joi.string().required(),
        category: Joi.string().required(),
        tag: Joi.string().required(),
      })
      .required(),
    price: Joi.number().required(),
    weight: Joi.string().required(),
    quantity: Joi.string().required(),
    image: Joi.array().items(Joi.string().optional()),
    description: Joi.string().optional(),
  });
  return schema.validate(wishlist);
}

exports.userSchema = userSchema;
exports.UserModel = UserModel;
exports.validate = validateUser;
exports.validateAddress = validateAddress;
exports.addressSchema = addressSchema;
exports.validateWishlist = validateWishlist;
