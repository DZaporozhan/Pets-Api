const getCurrent = async (req, res, next) => {
  const { email, name, city, phone, birthday, _id, avatarURL } = req.user;

  try {
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
  } catch (error) {
    next(error);
  }
};

module.exports = getCurrent;
