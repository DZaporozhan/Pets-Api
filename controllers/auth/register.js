const { User, joiRegistrationSchema } = require("../../models");
const createError = require("http-errors");
const bcrypt = require("bcryptjs");

const register = async (req, res, next) => {
  try {
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
        result: {
          email,
          password,
          name,
          city,
          phone,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
