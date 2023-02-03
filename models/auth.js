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
  password: Joi.string()
    .regex(/^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{7,32}$/)
    .min(7)
    .max(32)
    .required(),
  repeat_password: Joi.ref("password"),
  name: Joi.string().required(),
  city: Joi.string().required(),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
});

const joiLoginSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{7,32}$/)
    .min(7)
    .max(32)
    .required(),
});

module.exports = {
  Auth,
  joiRegistrationSchema,
  joiLoginSchema,
};
