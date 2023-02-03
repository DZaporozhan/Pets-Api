const express = require("express");
const router = express.Router();

const { controllerAuth } = require("../../controllers");
const { authMiddleware } = require("../../middlewares");

router.post("/register", controllerAuth.register);

router.post("/login", controllerAuth.login);

router.get("/logout", authMiddleware, controllerAuth.logout);

module.exports = router;
