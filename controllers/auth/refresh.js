const jwt = require("jsonwebtoken");

const { User, joiRefreshSchema } = require("../../models/user");

const { HttpError, createTokens } = require("../../helpers");

const { SECRET_KEY } = process.env;

const refresh = async (req, res) => {
  const { error } = joiRefreshSchema.validate(req.body);
  if (error) {
    error.status = 400;
    throw error;
  }
  const { refreshToken: refToken } = req.body;
  try {
    const { id } = jwt.verify(refToken, SECRET_KEY);
    const isExist = await User.findOne({ id });
    if (!isExist) {
      throw HttpError(403, "Token invalid");
    }
    const payload = {
      id,
    };
    const tokens = createTokens(payload);

    const { accessToken, refreshToken } = await User.findByIdAndUpdate(id, {
      ...tokens,
    });
    res.status(200).json({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    throw HttpError(403, error.message);
  }
};

module.exports = refresh;
