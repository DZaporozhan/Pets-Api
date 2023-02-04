const {Notices} = require("../../models/noticesSchema");
const createError = require("http-errors");

const getOneNotice = async (req, res) => {
  const { id } = req.params;
    const result = await Notices.findById(id); 
  if (!result) {
    throw new createError.NotFound(`Contact with id=${id} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getOneNotice;