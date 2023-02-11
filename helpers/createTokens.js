const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const createTokens = (payload) => {
  const accessToken = jwt.sign(payload, SECRET_KEY, {
    expiresIn: "8h",
  });
  const refreshToken = jwt.sign(payload, SECRET_KEY, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

module.exports = createTokens;
