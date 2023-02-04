const express = require("express");

const router = express.Router();

const { controllerNotices: ctrl } = require("../../controllers");

const { ctrlWrapper, authMiddleware } = require("../../middlewares");

const { isValidId } = require("../../middlewares");

const { noticesSchemas } = require("../../models/noticesSchema");

router.get("/:id", isValidId, ctrlWrapper(ctrl.getOneNotice));

// router.get("/", ctrlWrapper(ctrl.getNoticeByCategory));

router.patch(
  "/toFavorite",
  authMiddleware,
  ctrlWrapper(ctrl.addFavoriteNotices)
);

module.exports = router;
