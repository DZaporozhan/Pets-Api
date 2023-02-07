const { cloudinary } = require('../utils');
const { Notices } = require('../models/noticesSchema');
const { Pet } = require('../models/petSchema');
const { User } = require('../models/user');

const cloudinaryDeleteImage = async (req, res, next) => {
  const { path } = req.route;
  let oldImageURL = null;

  if (path === '/') {
    const { _id: id } = req.user;
    const userInfo = await User.findById(id);
    oldImageURL = userInfo.imageURL;
  } else if (path === '/pets/:id') {
    const { id } = req.params;
    const petInfo = await Pet.findById(id);
    if (!petInfo) {
      next();
      return;
    }
    oldImageURL = petInfo.imageURL;
  } else {
    const { id } = req.params;
    const noticeInfo = await Notices.findById(id);
    if (!noticeInfo) {
      next();
      return;
    }
    oldImageURL = noticeInfo.imageURL;
  }

  if (
    oldImageURL.includes('Users') ||
    oldImageURL.includes('Pets') ||
    oldImageURL.includes('Avatars')
  ) {
    await cloudinary.uploader.destroy(oldImageURL);
  }

  next();
};

module.exports = cloudinaryDeleteImage;
