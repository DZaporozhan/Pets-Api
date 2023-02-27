const { User, joiLoginSchema } = require("../../models/user");
const createError = require("http-errors");
const bcrypt = require("bcryptjs");

const createTokens = require("../../helpers/createTokens");

const login = async (req, res) => {
  const { error } = joiLoginSchema.validate(req.body);
  if (error) {
    error.status = 400;
    throw error;
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  const id = user._id;
  const favorite = user.favorite;
  const name = user.name;

  const checkPassword = bcrypt.compareSync(password, user.password);

  if (!user || !checkPassword) {
    throw new createError.Unauthorized(`Email or password are not found`);
  }

  const payload = {
    id: user._id,
  };

  const { accessToken, refreshToken } = createTokens(payload);

  await User.findByIdAndUpdate(user._id, { accessToken, refreshToken });

  res.status(200).json({
    accessToken,
    refreshToken,
    user: {
      id,
      email,
      name,
      favorite,
    },
  });
};

module.exports = login;
