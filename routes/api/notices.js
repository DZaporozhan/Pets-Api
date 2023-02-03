const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/notices");

const { ctrlWrapper } = require("../../middlewares");

// const { isValidId } = require("../../middlewares");

// const { noticesSchemas } = require("../../models/noticesSchema");

router.get("/:id", ctrlWrapper(ctrl.getOneNotice));
router.get("/", ctrlWrapper(ctrl.getNoticeByCategory));

module.exports = router;