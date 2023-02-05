const { User } = require("../models/user");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const authMiddleware = async (req, _, next) => {
  const { authorization = "" } = req.headers;

  if (!authorization) {
    next(new Error("Please provide a token, no token in authorization header"));
  }

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    throw new createError.Unauthorized("Not authorized");
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);

    const user = await User.findById(id);
    if (!user || !user.token) {
      throw new createError.Unauthorized("Not authorized");
    }

    req.user = user;

    next();
  } catch (error) {
    if (error.message === "Invalid Signature") {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = authMiddleware;
