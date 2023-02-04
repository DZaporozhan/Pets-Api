const { Notices } = require('../../models/noticesSchema');

const add = async (req, res) => {
  const { _id, phone, email } = req.user;
  const result = await Notices.create({
    ...req.body,
    phone,
    email,
    owner: _id,
  });
  res.status(201).json({
    status: 'created',
    code: 201,
    data: { result },
  });
};

module.exports = add;
