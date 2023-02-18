const { Notices } = require("../../models/noticesSchema");

const getAllUserNotices = async ({ user, query }, res) => {
  const { page = 1, limit = 50, title = "" } = query;

  const skip = (page - 1) * limit;

  let data;

  let total;

  if (title !== "") {
    data = await Notices.find(
      { $text: { $search: title }, owner: user.id },
      "-createdAt -updatedAt",
      {
        skip,
        limit: Number(limit),
      }
    ).sort({ createdAt: -1 });

    total = await Notices.countDocuments({
      $text: { $search: title },
      owner: user.id,
    });
  } else {
    data = await Notices.find({ owner: user.id }, "-createdAt -updatedAt", {
      skip,
      limit: Number(limit),
    }).sort({ createdAt: -1 });

    total = await Notices.countDocuments({ owner: user.id });
  }

  res.json({ data, total });
};

module.exports = getAllUserNotices;
