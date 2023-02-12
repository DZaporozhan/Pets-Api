const { Pet } = require('../../models/petSchema');

const getUserInfo = async (req, res) => {
  const { imageURL, name, email, birthday, phone, city, _id, favorite } = req.user;

  const pets = await Pet.find({ owner: _id });

  const userInfo = {
    user: {
      _id,
      imageURL,
      userInfo: {
        name,
        email,
        birthday,
        phone,
        city,
        favorite,
      },
      userPets: pets,
    },
  };

  res.status(200).json(userInfo);
};

module.exports = getUserInfo;
