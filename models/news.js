const { Schema, model } = require("mongoose");


const newsSchema =  Schema(
  {
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);



const News = model("news", newsSchema);

module.exports = News;