const { cloudinary } = require('../utils');
const fs = require('fs/promises');

const cloudinaryAddImage = async (req, res, next) => {
  try {
    if (!req.file) {
      next();
      return;
    }

    const { category, birthdate } = req.body;

    const { path: imagePath } = req.file;

    const bitmap = await fs.readFile(imagePath, 'base64');
    const imageURL = `data:image/jpeg;base64,${bitmap}`;
    fs.unlink(imagePath);

    let folder = '';

    if (category) {
      folder = 'Pets';
    } else if (birthdate) {
      folder = 'Avatars';
    } else {
      folder = 'Users';
    }

    const uploadedResponse = await cloudinary.uploader.upload(imageURL, {
      folder,
      transformation: { width: 250, crop: 'scale' },
    });
    req.body.imageURL = uploadedResponse.public_id;
    next();
  } catch (error) {
    next();
  }
};

module.exports = cloudinaryAddImage;
