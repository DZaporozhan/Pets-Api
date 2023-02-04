const express = require("express");
const router = express.Router();

const getNews = require("../../controllers/news/getNews");
const { ctrlWrapper } = require("../../middlewares");

router.get("/", ctrlWrapper(getNews));

module.exports = router;
