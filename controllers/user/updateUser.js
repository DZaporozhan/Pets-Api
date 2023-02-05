const createHttpError = require("http-errors");
const { User } = require("../../models/user");

const updateUser = async (req, res) => {
  const { _id, password } = req.user;
  const { imageURL } = req.body;
  const result = await User.findByIdAndUpdate(
    _id,
    { password, ...req.body },
    { new: true }
  );
  console.log(_id);
  console.log(req.body);
  if (!result) {
    throw createHttpError(401);
  }
  if (!imageURL) {
    return res.send({ message: "No user data changed" });
  }
  console.log(result);
  res.json(result);
};

module.exports = updateUser;
