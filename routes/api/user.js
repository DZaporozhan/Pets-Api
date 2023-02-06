const express = require('express');
const router = express.Router();

const { controllerPet } = require('../../controllers');
const { authMiddleware, upload, cloudinaryAddImage } = require('../../middlewares');
const { ctrlWrapper } = require('../../helpers');

router.post(
  '/pets',
  authMiddleware,
  upload.single('imageURL'),
  cloudinaryAddImage,
  ctrlWrapper(controllerPet.addPet)
);

router.delete('/pets/:id', authMiddleware, ctrlWrapper(controllerPet.removePet));

router.patch(
  '/pets/:id',
  authMiddleware,
  upload.single('imageURL'),
  cloudinaryAddImage,
  ctrlWrapper(controllerPet.updatePetImg)
);

router.get('/', authMiddleware, ctrlWrapper(controllerPet.getUserInfo));

router.patch(
  "/update",
  authMiddleware,
  upload.single("imageURL"),
  cloudinaryAddImage,
  ctrlWrapper(controllerPet.updateUser)
);

module.exports = router;
