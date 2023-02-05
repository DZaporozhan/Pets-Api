const { response } = require("express");
const { User } = require("../../models/user");
const { Conflict } = require("http-errors");

const addFavoriteNotices = async (
  { user: { id, favorite: favoritePosts }, params },
  res
) => {
  if (favoritePosts.includes(params.id)) {
    throw new Conflict(
      `fNotice with id: ${params.id} is already in your favorite list`
    );
  }

  await User.updateOne({ _id: id }, { $push: { favorite: params.id } });

  const { favorite } = await User.findById(id);

  res.json({ message: "Notice add to favorite", favorite });
};

module.exports = addFavoriteNotices;
