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

// favoriteNotices
router.get("/favorite", authMiddleware, ctrlWrapper(ctrl.getFavoriteNotices));

router.post(
  "/favorite/:id",
  authMiddleware,
  isValidId,
  ctrlWrapper(ctrl.addFavoriteNotices)
);

router.delete(
  "/favorite/:id",
  authMiddleware,
  ctrlWrapper(ctrl.removeNoticeFromFavorite)
);

// myAds Notices

router.get("/owner", authMiddleware, ctrlWrapper(ctrl.getAllUserNotices));

router.delete(
  "/owner/:id",
  authMiddleware,
  isValidId,
  ctrlWrapper(ctrl.removeUserNotice)
);
// Notices

router.get("/", ctrlWrapper(ctrl.getNoticeByCategory));

router.post(
  "/",
  authMiddleware,
  upload.single("imageURL"),
  validation(noticesReqSchema),
  cloudinaryAddImage,
  ctrlWrapper(ctrl.add)
);

router.get("/:id", isValidId, ctrlWrapper(ctrl.getOneNotice));

module.exports = router;
