const createHttpError = require("http-errors");
const { User, updateUserSchema } = require("../../models/user");

const updateUser = async (req, res) => {
  const { imageURL, name, email, birthday, phone, city } = req.body;
  const { error } = updateUserSchema.validate(req.body);
  if (error) {
    error.status = 400;
    throw error;
  }

  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(
    _id,
    { imageURL, name, email, birthday, phone, city },
    { new: true }
  );
  if (!result) {
    throw createHttpError(401);
  }
  // console.log(result);
  res.json({ imageURL, name, email, birthday, phone, city });
};

module.exports = updateUser;
