const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleValidationError } = require("../helpers");

const categoryList = ["sell", "lost found", "in good hands"];
const sexList = ["male", "female"];
const dateRegExp =
  /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/;

const priceRegExp = /^-?\d*\d+.?(\d{1,2})?$/;
// eslint-disable-next-line no-useless-escape
const cityRegEx = /^[- a-z\']+(?:(?:(,\s|,)[-a-z]+))$/i;

const noticesSchema = new Schema(
  {
    category: {
      type: String,
      enum: ["sell", "in good hands", "lost found"],
      required: [true, "field is required!"],
    },

    title: {
      type: String,
      required: [true, "field is required!"],
    },

    name: {
      type: String,
      default: "",
    },

    birthday: {
      type: String,
      default: "",
    },

    breed: {
      type: String,
      default: "",
    },

    sex: {
      type: String,
      enum: ["male", "female"],
      required: [true, "field is required!"],
    },

    location: {
      type: String,
      required: [true, "field is required!"],
    },

    comments: {
      type: String,
      default: "",
    },

    price: {
      type: String,
      default: null,
    },
    imageURL: {
      type: String,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    email: {
      type: String,
      required: [true, "email is required field!"],
    },
    phone: {
      type: String,
      required: [true, "phone is required field!"],
    },
  },

  { versionKey: false, timestamps: true }
);

noticesSchema.post("save", handleValidationError);

const noticesReqSchema = Joi.object({
  category: Joi.string()
    .valid(...Object.values(categoryList))
    .required(),
  title: Joi.string().min(2).max(48).required(),
  name: Joi.string().min(2).max(16).optional(),
  birthday: Joi.string().pattern(dateRegExp).optional(),
  breed: Joi.string().min(2).max(24).optional(),
  sex: Joi.string()
    .valid(...Object.values(sexList))
    .required(),
  location: Joi.string().pattern(cityRegEx).required(),
  price: Joi.string().pattern(priceRegExp).optional(),
  imageURL: Joi.string().optional(),
  comments: Joi.string().min(8).max(120).optional(),
});

const Notices = model("notices", noticesSchema);

module.exports = {
  Notices,
  noticesReqSchema,
};
