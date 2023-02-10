const { User, joiLoginSchema } = require("../../models/user");
const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

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

  // create a Token
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "5h" });

  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    status: "success",
    code: 200,
    token,
    user: {
      id,
      email,
      name,
      favorite,
    },
  });
};

module.exports = login;
