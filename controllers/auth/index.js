const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const getCurrent = require("./getCurrent");
const refresh = require("./refresh");
const { googleAuth, googleRedirect } = require("./googleAuth");

module.exports = {
  register,
  login,
  logout,
  getCurrent,
  refresh,
  googleAuth,
  googleRedirect,
};
