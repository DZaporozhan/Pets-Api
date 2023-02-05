const { Pet } = require('../../models/petSchema');

const getUserInfo = async (req, res) => {
  const { avatarURL, name, email, birthday, phone, city, _id } = req.user;

  const pets = await Pet.find({ owner: _id });

  const userInfo = {
    user: {
      _id,
      avatarURL,
      userInfo: {
        name,
        email,
        birthday,
        phone,
        city,
      },
      userPets: pets,
    },
  };

  res.status(200).json(userInfo);
};

module.exports = getUserInfo;
