const express = require('express');
const router = express.Router();

const { ctrlUser } = require('../../controllers');
const { authMiddleware, ctrlWrapper } = require('../../middlewares');

router.post('/pets', authMiddleware, ctrlWrapper(ctrlUser.addPet));

router.delete('/pets/:id', authMiddleware, ctrlWrapper(ctrlUser.removePet));

router.get('/', authMiddleware, ctrlWrapper(ctrlUser.getUserInfo));

module.exports = router;
