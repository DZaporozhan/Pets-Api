const { response } = require("express");
const { User } = require("../../models/user");
const { Conflict } = require("http-errors");

// bodi прийме {
//     "favorite": id поста
// }

const addFavoriteNotices = async (
  { user: { id, favorite: favoritePosts }, body },
  res
) => {
  if (favoritePosts.includes(body.favorite)) {
    throw new Conflict(
      `fNotice with id: ${body.favorite} is already in your favorite list`
    );
  }

  await User.updateOne({ _id: id }, { $push: { favorite: body.favorite } });

  const { favorite } = await User.findById(id);

  res.json({ message: "Notice add to favorite", favorite });
};

module.exports = addFavoriteNotices;
