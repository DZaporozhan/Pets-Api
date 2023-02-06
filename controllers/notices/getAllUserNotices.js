const { Notices } = require("../../models/noticesSchema");

const getAllUserNotices = async ({ user }, res) => {
  const userNotices = await Notices.find({ owner: user.id });

  res.json(userNotices);
};

module.exports = getAllUserNotices;
