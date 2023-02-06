const { Notices } = require("../../models/noticesSchema");

const getAllUserNotices = async ({ user, query }, res) => {
  const { page = 1, limit = 50 } = query;

  const skip = (page - 1) * limit;

  const userNotices = await Notices.find({ owner: user.id }, "", {
    skip,
    limit: Number(limit),
  });

  res.json(userNotices);
};

module.exports = getAllUserNotices;
