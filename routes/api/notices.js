const express = require('express');

const router = express.Router();

const { controllerNotices, notices: ctrl } = require('../../controllers');

const {
  ctrlWrapper,
  authMiddleware: auth,
  validation,
} = require('../../middlewares');

const { isValidId } = require('../../middlewares');

const {
  noticesSchemas,
  noticesReqSchema,
} = require('../../models/noticesSchema');

router.get('/:id', isValidId, ctrlWrapper(controllerNotices.getOneNotice));

router.post('/', auth, validation(noticesReqSchema), ctrlWrapper(ctrl.add));

// router.get("/", ctrlWrapper(ctrl.getNoticeByCategory));

module.exports = router;
