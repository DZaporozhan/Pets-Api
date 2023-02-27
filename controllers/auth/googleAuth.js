const queryString = require("query-string");
const axios = require("axios");
const { User } = require("../../models/user");
const createTokens = require("../../helpers/createTokens");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const googleAuth = async (req, res) => {
  const stringifiedParams = queryString.stringify({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: `${process.env.BASE_URL}/auth/google-redirect`,
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" "),
    response_type: "code",
    access_type: "offline",
    prompt: "consent",
  });
  return res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`
  );
};

const googleRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  const urlObj = new URL(fullUrl);
  const urlParams = queryString.parse(urlObj.search);
  const code = urlParams.code;
  const tokenData = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: "post",
    data: {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_SECRET,
      redirect_uri: `${process.env.BASE_URL}/auth/google-redirect`,
      grant_type: "authorization_code",
      code,
    },
  });
  const userData = await axios({
    url: "https://www.googleapis.com/oauth2/v2/userinfo",
    method: "get",
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });

  const { email, name } = userData.data;
  const user = await User.findOne({ email });
  let token = null;
  if (user) {
    const payload = {
      id: user._id,
    };

    const { accessToken, refreshToken } = createTokens(payload);

    await User.findByIdAndUpdate(user._id, { accessToken, refreshToken });
    return res.redirect(
      `${process.env.FRONTEND_URL}login/?accessToken=${accessToken}`
    );
  }
  if (!user) {
    const payload = {
      id: userData.data.id,
    };

    const { accessToken, refreshToken } = createTokens(payload);
    const hashPassword = bcrypt.hashSync(
      userData.data.id,
      bcrypt.genSaltSync(10)
    );
    await User.create({
      email,
      password: hashPassword,
      name,
      city: "City, Region",
      phone: "+380*********",
      accessToken,
      refreshToken,
    });
    token = accessToken;
  }

  return res.redirect(`${process.env.FRONTEND_URL}login/?accessToken=${token}`);
};

module.exports = { googleAuth, googleRedirect };
