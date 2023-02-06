// const validation = require("./validation");
const authMiddleware = require('./authMiddleWare');
const isValidId = require('./isValidId');
const validation = require('./validation');
const upload = require('./upload');
const cloudinaryAddImage = require('./cloudinaryAddImage');
const cloudinaryDeleteImage = require('./cloudinaryDeleteImage');

module.exports = {
  authMiddleware,
  validation,
  isValidId,
  upload,
  cloudinaryAddImage,
  cloudinaryDeleteImage,
};
