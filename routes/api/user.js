const express = require('express');
const router = express.Router();

const { controllerPet } = require('../../controllers');
const { authMiddleware, ctrlWrapper } = require('../../middlewares');

router.post('/pets', authMiddleware, ctrlWrapper(controllerPet.addPet));

router.delete('/pets/:id', authMiddleware, ctrlWrapper(controllerPet.removePet));

router.get('/', authMiddleware, ctrlWrapper(controllerPet.getUserInfo));

module.exports = router;
