const controllerUser = require('./auth');
const controllerNotices = require('./notices');
const controllerPet = require('./pets');
const controllerUserData = require('./user');

module.exports = {
  controllerUser,
  controllerNotices,
  controllerPet,
  controllerUserData,
};
