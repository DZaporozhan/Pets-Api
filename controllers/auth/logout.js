const { Auth } = require("../../models");

const logout = async (req, res) => {
  const { _id } = req.user;

  await Auth.findByIdAndUpdate(_id, { token: null });

  res.status(204).json();
};

module.exports = logout;
