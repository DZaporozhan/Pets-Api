const { Notices } = require("../../models/noticesSchema");
const { NotFound } = require("http-errors");

const removeUserNotice = async ({ params }, res) => {
  const response = await Notices.findByIdAndRemove(params.id);

  if (!response) {
    throw new NotFound(`notice with id: ${params.id} not found!`);
  }

  res.json({ response, message: `notice with ${params.id} has been deleted` });
};

module.exports = removeUserNotice;
