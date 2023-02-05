const { User } = require("../../models/user");

const updateUser = async (req, res) => {
  const { _id } = req.user;
  console.log(_id);

  console.log(req.body);
};

module.exports = updateUser;
