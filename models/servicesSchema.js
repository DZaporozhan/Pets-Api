const { Schema, model } = require("mongoose");


const servicesSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'title is required'],
    },
    url: {
      type: String,
      required: [true, 'url is required'],
    },
    addressUrl: {
      type: String,
      required: [true, 'addressUrl is required'],
    },
    imageUrl: {
      type: String,
      required: [true, 'imageUrl is required'],
    },
    address: {
      type: String,
      required: [true, 'address is required'],
    },
    workDays: {
      type: Array,
      required: [true, 'workDays is required'],
    },
    phone: {
      type: String,
      required: [true, 'phone is required'],
    },
    email: {
      type: String,
      required: [true, 'email is required'],
    },
  },
  { versionKey: false, timestamps: true }
);


const Service = model("service", servicesSchema);

module.exports = Service;