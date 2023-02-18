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
  '/pets',
  authMiddleware,
  upload.single('imageURL'),
  cloudinaryAddImage,
  ctrlWrapper(controllerPet.addPet)
);

router.delete(
  '/pets/:id',
  authMiddleware,
  cloudinaryDeleteImage,
  ctrlWrapper(controllerPet.removePet)
);

router.patch(
  '/pets/:id',
  authMiddleware,
  upload.single('imageURL'),
  cloudinaryDeleteImage,
  cloudinaryAddImage,
  ctrlWrapper(controllerPet.updatePetImg)
);

router.get('/', authMiddleware, ctrlWrapper(controllerPet.getUserInfo));

router.patch(
  '/',
  authMiddleware,
  upload.single('imageURL'),
  cloudinaryDeleteImage,
  cloudinaryAddImage,
  ctrlWrapper(controllerPet.updateUser)
);

module.exports = router;
