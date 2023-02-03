const { Schema, model } = require("mongoose");
const Joi = require("joi");

const authSchema = Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const Auth = model("auth", authSchema);

const joiRegistrationSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  password: Joi.string().min(7).max(32).required(),
  repeat_password: Joi.ref("password"),
  name: Joi.string().required(),
  city: Joi.string()
    .required()
    .pattern(/[A-Z][a-z]+, [A-Z][a-z]*/),
  phone: Joi.string()
    .length(13)
    .pattern(/^\+380\d{9}$/, "numbers")
    .required(),
});

const joiLoginSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  password: Joi.string().min(7).max(32).required(),
});

module.exports = {
  Auth,
  joiRegistrationSchema,
  joiLoginSchema,
};
