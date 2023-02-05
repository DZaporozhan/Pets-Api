const { Schema, model } = require("mongoose");
const Joi = require("joi").extend(require("@joi/date"));

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
    avatarURL: {
      type: String,
      default:
        "https://pixabay.com/get/g8870f9a26b4b0198af65cae3c33656a61c8c5cf4d9422b3a1b93ee87081a2d07001a8f0f5c1ef691fb776c18cbe455170ec07ed771a5304c260cdd6c2a70e47fa71ea2c90f8d91f242f44b7a8e4cc105_1280.png",
    },
    token: {
      type: String,
      default: null,
    },
    favorite: {
      type: Array,
      default: [],
    },
  },
  { versionKey: false, timestamps: true }
);

const User = model("user", userSchema);

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

const updateUserSchema = Joi.object({
  avatarURL: Joi.string(),
  name: Joi.string(),
  email: Joi.string().email({
    minDomainSegments: 2,
  }),
  birthday: Joi.date().format("DD.MM.YYYY").utc(),
  phone: Joi.string()
    .length(13)
    .pattern(/^\+380\d{9}$/, "numbers"),
  city: Joi.string()
    .required()
    .pattern(/[A-Z][a-z]+, [A-Z][a-z]*/),
});

module.exports = {
  User,
  joiRegistrationSchema,
  joiLoginSchema,
  updateUserSchema,
};
