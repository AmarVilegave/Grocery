const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const adminSchema = new mongoose.Schema({
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
  role: { type: String, required: true },
});

adminSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, config.get("jwtPrivateKey"));
  console.log(token);
  return token;
};

adminSchema.methods.validateAuthToken = function (token) {
  const decode = jwt.verify(token, config.get("jwtPrivateKey"));
  console.log("decode :", decode);
};

const AdminModel = mongoose.model("Admin", adminSchema);

function validateAdmin(admin) {
  const schema = Joi.object({
    fullName: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(8).max(1024).required(),
    mobileNo: Joi.number()
      .min(10 ** 9)
      .max(10 ** 10 - 1)
      .required(),
    role: Joi.string().required(),
  });
  return schema.validate(admin);
}

exports.adminSchema = adminSchema;
exports.AdminModel = AdminModel;
exports.validate = validateAdmin;
