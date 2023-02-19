const { Notices } = require("../../models/noticesSchema");
const createError = require("http-errors");

const getFavoriteNotices = async ({ _id, query, user }, res) => {
  const { page = 1, limit = 50, title = "" } = query;

  const skip = (page - 1) * limit;

  const idArray = user.favorite.map((favorite) => {
    return favorite.toString();
  });

  let total;

  let data;

  if (title !== "") {
    data = await Notices.find(
      { title: { $regex: title, $options: "i" }, _id: idArray },
      "-createdAt -updatedAt",
      {
        skip,
        limit: Number(limit),
      }
    );

    total = await Notices.countDocuments({
      title: { $regex: title, $options: "i" },
      _id: idArray,
    });
  } else {
    data = await Notices.find({ _id: idArray }, "-createdAt -updatedAt", {
      skip,
      limit: Number(limit),
    });

    total = await Notices.countDocuments({ _id: idArray });
  }

  if (!data) {
    throw new createError.NotFound(404, "You have no any favorite notices");
  }

  res.status(200).json({ data, total });
};

module.exports = getFavoriteNotices;
