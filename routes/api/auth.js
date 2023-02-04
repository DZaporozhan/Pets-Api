const express = require("express");
const router = express.Router();

const { controllerUser } = require("../../controllers");
const { authMiddleware } = require("../../middlewares");

router.post("/register", controllerUser.register);

router.post("/login", controllerUser.login);

router.get("/current", authMiddleware, controllerUser.getCurrent);

router.post("/logout", authMiddleware, controllerUser.logout);

module.exports = router;
