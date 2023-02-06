const { HttpError } = require("http-errors");
const { User } = require("../../models/user");

const removeNoticeFromFavorite = async (req, res) => {
  const { _id, favorite } = req.user;
  const { id } = req.params;

  if (!favorite.includes(id)) {
    throw HttpError(
      409,
      `there is not notice with id: ${id} in your favorite list `
    );
  }

  const user = await User.findByIdAndUpdate(
    _id,
    { $pull: { favorite: id } },
    {
      new: true,
    }
  );

  res.status(200).json({
    favorite: user.favorite,
    id,
    message: "notice deleted from favorite",
  });
};

module.exports = removeNoticeFromFavorite;
