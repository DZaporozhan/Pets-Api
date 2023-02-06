const express = require("express");

const router = express.Router();

const { controllerNotices: ctrl } = require("../../controllers");

const { ctrlWrapper } = require("../../helpers");

const {
  isValidId,
  authMiddleware,
  validation,
  upload,
  cloudinaryAddImage,
} = require("../../middlewares");

const { noticesReqSchema } = require("../../models/noticesSchema");

router.get("/", ctrlWrapper(ctrl.getNoticeByCategory));

router.post(
  "/favorite/:id",
  authMiddleware,
  isValidId,
  ctrlWrapper(ctrl.addFavoriteNotices)
);

router.post(
  "/",
  authMiddleware,
  upload.single("imageURL"),
  validation(noticesReqSchema),
  cloudinaryAddImage,
  ctrlWrapper(ctrl.add)
);

router.get("/owner", authMiddleware, ctrlWrapper(ctrl.getAllUserNotices));

router.get("/:id", isValidId, ctrlWrapper(ctrl.getOneNotice));

router.delete(
  "/owner/:id",
  authMiddleware,
  isValidId,
  ctrlWrapper(ctrl.removeUserNotice)
);

module.exports = router;
