const getCurrent = async (req, res) => {
  const { email, name, city, phone, birthday, _id, avatarURL } = req.user;

  res.json({
    status: "sucess",
    code: 200,
    data: {
      user: {
        _id,
        avatarURL,
        email,
        name,
        city,
        phone,
        birthday,
      },
    },
  });
};

module.exports = getCurrent;
