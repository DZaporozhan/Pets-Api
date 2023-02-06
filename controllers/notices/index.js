const add = require("./add");
const addFavoriteNotices = require("./addFavoriteNotices");
const getOneNotice = require("./getOneNotice");
const getNoticeByCategory = require("./getNoticeByCategory");
const removeNoticeFromFavorite = require("./removeNoticeFromFavorite");

module.exports = {
  add,
  addFavoriteNotices,
  getOneNotice,
  removeNoticeFromFavorite,
  getNoticeByCategory,
};
