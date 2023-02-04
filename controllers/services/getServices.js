const Service = require("../../models/servicesSchema");

const getServices = async (req, res, next) => {
  const services = await Service.find({});

  res.status(200).json(services);
};

module.exports = getServices;