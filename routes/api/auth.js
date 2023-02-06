const express = require("express");
const router = express.Router();

const { controllerUser } = require("../../controllers");
const { authMiddleware } = require("../../middlewares");
const { ctrlWrapper } = require("../../helpers");

router.post("/register", ctrlWrapper(controllerUser.register));

router.post("/login", ctrlWrapper(controllerUser.login));

router.get("/current", authMiddleware, ctrlWrapper(controllerUser.getCurrent));

router.post("/logout", authMiddleware, ctrlWrapper(controllerUser.logout));

module.exports = router;
