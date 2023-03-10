const express = require('express');
const router = express.Router();

const { controllerUserData } = require('../../controllers');
const {
  authMiddleware,
  upload,
  cloudinaryAddImage,
  cloudinaryDeleteImage,
} = require('../../middlewares');
const { ctrlWrapper } = require('../../helpers');

router.get('/', authMiddleware, ctrlWrapper(controllerUserData.getUserInfo));

router.patch(
  '/',
  authMiddleware,
  upload.single('imageURL'),
  cloudinaryDeleteImage,
  cloudinaryAddImage,
  ctrlWrapper(controllerUserData.updateUser)
);

module.exports = router;
