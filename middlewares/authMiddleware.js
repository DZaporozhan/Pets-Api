const { User } = require("../models/user");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const authMiddleware = async (req, _, next) => {
  try {
    const { authorization = "" } = req.headers;

    if (!authorization) {
      next(
        new Error("Please provide a token, no token in authorization header")
      );
    }

    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer") {
      throw new createError.Unauthorized("Not authorized");
    }

    const { id } = jwt.verify(token, SECRET_KEY);

    const user = await User.findById(id);
    if (!user || !user.accessToken) {
      throw new createError.Unauthorized("Not authorized");
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    if (error.message === "Invalid Signature") {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = authMiddleware;
