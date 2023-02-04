const express = require("express");

const router = express.Router();

const {controllerNotices} = require("../../controllers");

const { ctrlWrapper } = require("../../middlewares");

 const { isValidId } = require("../../middlewares");

 const { noticesSchemas } = require("../../models/noticesSchema");


router.get("/:id", isValidId, ctrlWrapper(controllerNotices.getOneNotice));

// router.get("/", ctrlWrapper(ctrl.getNoticeByCategory));

module.exports = router;