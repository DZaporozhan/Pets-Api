const { cloudinary } = require('../utils');
const fs = require('fs/promises');

const cloudinaryAddImage = async (req, res, next) => {
  if (!req.file) {
    req.body.imageURL = null;
    next();
    return;
  }

  const { category, password } = req.body;

  const { path: imagePath } = req.file;

  const bitmap = await fs.readFile(imagePath, 'base64');
  const imageURL = `data:image/jpeg;base64,${bitmap}`;
  fs.unlink(imagePath);

  let folder = '';

  if (category) {
    folder = 'Pets';
  } else if (password) {
    folder = 'Users';
  } else {
    folder = 'Avatars';
  }

  const uploadedResponse = await cloudinary.uploader.upload(imageURL, {
    folder,
    transformation: { width: 250, crop: 'scale' },
  });
  req.body.imageURL = uploadedResponse.public_id;
  next();
};

module.exports = cloudinaryAddImage;
