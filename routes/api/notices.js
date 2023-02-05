const express = require("express");

const router = express.Router();

const { controllerNotices: ctrl } = require("../../controllers");

const {
  ctrlWrapper,
  authMiddleware,
  validation,
} = require("../../middlewares");

const { isValidId } = require("../../middlewares");

const {
  noticesReqSchema,
 } = require("../../models/noticesSchema");

router.get(
  "/:id",
  isValidId,
  ctrlWrapper(ctrl.getOneNotice)
);

router.get("/",
  ctrlWrapper(ctrl.getNoticeByCategory)
);

router.post(
  "/favourite/:id",
  authMiddleware,
  ctrlWrapper(ctrl.addFavoriteNotices)
);

router.post(
  "/",
  authMiddleware,
  validation(noticesReqSchema),
  ctrlWrapper(ctrl.add)
);

module.exports = router;
