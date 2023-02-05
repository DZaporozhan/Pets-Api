const { Schema, model } = require("mongoose");
const Joi = require("joi").extend(require("@joi/date"));
const { handleValidationError } = require("../helpers");

const petSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    birthdate: {
      type: String,
      required: [true, "Date of birth is required"],
    },
    breed: {
      type: String,
      required: [true, "Breed is required"],
    },
    comments: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
      default: "",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

petSchema.post("save", handleValidationError);

const Pet = model("pets", petSchema);

const joiAddingPetSchema = Joi.object({
  name: Joi.string().min(2).max(16).required(),
  birthdate: Joi.date().format("DD.MM.YYYY").required(),
  breed: Joi.string().min(2).max(16).required(),
  comments: Joi.string().min(8).max(120).optional(),
  avatarURL: Joi.string().optional(),
});

module.exports = {
  Pet,
  joiAddingPetSchema,
};
