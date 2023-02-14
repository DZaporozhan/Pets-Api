const { Notices } = require("../../models/noticesSchema");

const getAllUserNotices = async ({ user, query }, res) => {
  const { page = 1, limit = 50 } = query;

  const skip = (page - 1) * limit;

  const total = await Notices.countDocuments({ owner: user.id });

  const data = await Notices.find({ owner: user.id }, "", {
    skip,
    limit: Number(limit),
  });

  res.json({ data, total });
};

module.exports = getAllUserNotices;
