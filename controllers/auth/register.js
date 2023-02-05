const { User, joiRegistrationSchema } = require("../../models/user");
const createError = require("http-errors");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { error } = joiRegistrationSchema.validate(req.body);
  if (error) {
    error.status = 400;
    throw error;
  }

  const { email, password, name, city, phone } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw new createError.Conflict(`This ${email} email in use`);
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  User.create({ email, password: hashPassword, name, city, phone });

  res.status(201).json({
    status: "success",
    code: 201,
    user: {
      email,
      password,
      name,
      phone,
      city,
    },
  });
};

module.exports = register;
