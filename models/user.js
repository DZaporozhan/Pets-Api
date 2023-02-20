const { Schema, model } = require("mongoose");
const Joi = require("joi").extend(require("@joi/date"));
const { handleValidationError } = require("../helpers");

const emailRegexp =
  // eslint-disable-next-line no-useless-escape
  /^(?=.{10,63}$)(([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/;
const nameRegexp = /^(?=.{2,16}$)([A-Za-z])*$/;
const cityRegEx = /^[-a-z]+(?:(?:(,\s|,)[-a-z]+))$/i;

const userSchema = Schema(
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
    },
    birthday: {
      type: String,
      default: "",
    },
    imageURL: {
      type: String,
      default: "",
    },
    accessToken: {
      type: String,
      default: "",
    },
    refreshToken: {
      type: String,
      default: "",
    },
    favorite: {
      type: Array,
      default: [],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleValidationError);
const User = model("user", userSchema);

const joiRegistrationSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ua", "org"] },
    })
    .pattern(emailRegexp)
    .min(10)
    .max(63)
    .required(),
  password: Joi.string().min(7).max(32).required(),
  repeat_password: Joi.ref("password"),
  name: Joi.string().pattern(nameRegexp).required(),
  city: Joi.string().pattern(cityRegEx).required(),
  phone: Joi.string()
    .length(13)
    .pattern(/^\+380\d{9}$/, "numbers")
    .required(),
});

const joiLoginSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ua", "org"] },
    })
    .required(),
  password: Joi.string().min(7).max(32).required(),
});

const updateUserSchema = Joi.object({
  imageURL: Joi.string().optional(),
  name: Joi.string().pattern(nameRegexp),
  email: Joi.string().pattern(emailRegexp),
  birthday: Joi.date().format("DD.MM.YYYY").utc(),
  phone: Joi.string()
    .length(13)
    .pattern(/^\+380\d{9}$/, "numbers"),
  city: Joi.string().pattern(cityRegEx),
});
const joiRefreshSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

module.exports = {
  User,
  joiRegistrationSchema,
  joiLoginSchema,
  updateUserSchema,
  joiRefreshSchema,
};
