const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose.Promise = global.Promise;

const connectionToDB = async (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = {
  connectionToDB,
};
