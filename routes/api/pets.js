const express = require('express');
const router = express.Router();

const { controllerPet } = require('../../controllers');
const {
  authMiddleware,
  upload,
  cloudinaryAddImage,
  cloudinaryDeleteImage,
} = require('../../middlewares');
const { ctrlWrapper } = require('../../helpers');

router.post(
  '/',
  authMiddleware,
  upload.single('imageURL'),
  cloudinaryAddImage,
  ctrlWrapper(controllerPet.addPet)
);

router.delete('/:id', authMiddleware, cloudinaryDeleteImage, ctrlWrapper(controllerPet.removePet));

router.patch(
  '/:id',
  authMiddleware,
  upload.single('imageURL'),
  cloudinaryDeleteImage,
  cloudinaryAddImage,
  ctrlWrapper(controllerPet.updatePetImg)
);

module.exports = router;
