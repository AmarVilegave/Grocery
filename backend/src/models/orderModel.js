const { categorySchema } = require("./categoryModel");
const Joi = require("joi");
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: new mongoose.Schema({
      fullName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
      },
      email: {
        type: String,
        minlength: 5,
        maxlength: 255,
        required: true,
      },
      mobileNo: {
        type: Number,
        minlength: 10,
        maxlength: 10,
        required: true,
      },
      addresses: {
        type: {
          address: { type: String, required: true },
          landmark: { type: String, required: true },
          state: { type: String, required: true },
          city: { type: String, required: true },
          pincode: { type: Number, required: true, minlength: 6, maxlength: 6 },
        },
        optional: true,
      },
    }),
    optional: true,
  },
  cart: {
    type: new mongoose.Schema({
      items: {
        type: [
          {
            name: { type: String, required: true, minlength: 2, maxlength: 50 },
            category: {
              type: {
                category: { type: String, required: true },
                tag: { type: String, required: true },
                _id: { type: String, required: true },
              },
              required: true,
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
            _id: { type: String, required: true },
          },
        ],
        required: true,
      },
      totalPrice: {
        type: Number,
        required: true,
      },
      totalQuantity: {
        type: Number,
        required: true,
      },
    }),
    optional: true,
  },
  dateOfOrder: { type: Date, optional: true, default: Date.now() },
  paymentMode: { type: String, optional: true },
  deliveryDate: {
    type: Date,
    optional: true,
    default: new Date(Date.now() + 2 * 60 * 60 * 1000),
  },
});

const OrderModel = mongoose.model("Order", orderSchema);

function validateOrder(order) {
  const schema = Joi.object({
    user: Joi.object().keys({
      fullName: Joi.string().required().min(3).max(255),
      email: Joi.string().required().min(5).max(255).email(),
      mobileNo: Joi.number().required(),
      addresses: Joi.object().keys({
        _id: Joi.string().required(),
        address: Joi.string().required(),
        landmark: Joi.string().required(),
        state: Joi.string().required(),
        city: Joi.string().required(),
        pincode: Joi.number()
          .min(10 ** 5)
          .max(10 ** 6 - 1)
          .required(),
      }),
    }),
    cart: Joi.object()
      .keys({
        items: Joi.array()
          .items(
            Joi.object().keys({
              name: Joi.string().required().min(2).max(50),
              category: Joi.object()
                .keys({
                  category: Joi.string().required(),
                  tag: Joi.string().required(),
                  _id: Joi.string().required(),
                })
                .required(),
              price: Joi.number().min(1).required(),
              weight: Joi.string().required(),
              quantity: Joi.number().required(),
              _id: Joi.string().required(),
              image: Joi.array().items(Joi.string().optional()),
              description: Joi.string().required(),
            })
          )
          .required(),
        totalPrice: Joi.number().required(),
        totalQuantity: Joi.number().required(),
      })
      .optional(),
    paymentMode: Joi.string().optional(),
  });
  return schema.validate(order);
}

exports.orderSchema = orderSchema;
exports.OrderModel = OrderModel;
exports.validate = validateOrder;
