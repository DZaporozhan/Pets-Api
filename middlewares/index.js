// const validation = require("./validation");
const authMiddleware = require('./authMiddleWare');
const isValidId = require('./isValidId');
const validation = require('./validation');
const upload = require('./upload');

module.exports = {
  authMiddleware,
  validation,
  isValidId,
  upload,
};
