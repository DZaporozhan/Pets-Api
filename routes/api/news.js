const express = require("express");
const router = express.Router();

const getNews = require("../../controllers/news/getNews");
const { ctrlWrapper } = require("../../helpers");

router.get("/", ctrlWrapper(getNews));

module.exports = router;
