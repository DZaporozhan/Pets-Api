const { Notices } = require("../../models/noticesSchema");
const createError = require("http-errors");

const getNoticeByCategory = async (req, res) => {
  const { category, page = 1, limit = 10, title = "" } = req.query;
  const skip = (page - 1) * limit;

  let result;
  let total;

  if (title !== "") {
    result = await Notices.find(
      { $text: { $search: title }, category },
      "-createdAt -updatedAt",
      {
        skip,
        limit: Number(limit),
      }
    ).sort({ createdAt: -1 });

    total = await Notices.countDocuments({
      $text: { $search: title },
      category,
    });
  } else {
    result = await Notices.find({ category }, "-createdAt -updatedAt", {
      skip,
      limit: Number(limit),
    }).sort({ createdAt: -1 });

    total = await Notices.countDocuments({ category });
  }

  const categoryList = ["sell", "lost found", "in good hands"];
  const key = categoryList.includes(category);
  if (!key) {
    throw new createError.BadRequest("BadRequest: This category doesn`t exist");
  }

  if (!result) {
    throw new createError.NotFound("not found");
  }

  res.json({
    status: "Success",
    code: 200,
    data: {
      result,
      total,
    },
  });
};

module.exports = getNoticeByCategory;
