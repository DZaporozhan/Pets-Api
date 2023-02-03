const { Auth, joiRegistrationSchema, joiLoginSchema } = require("./auth");
const { Notices } = require("./noticesSchema");

module.exports = {
  Auth,
  joiRegistrationSchema,
  joiLoginSchema,
  Notices,
};
