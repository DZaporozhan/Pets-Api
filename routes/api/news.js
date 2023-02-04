const express = require("express");
const router = express.Router();

const getNews = require("../../controllers/news/getNews");

router.get("/", getNews);

module.exports = router;