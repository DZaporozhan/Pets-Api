const News = require("../../models/news");

const getNews = async (req, res, next) => {
  console.log("getting news...");
  const allNews = await News.find({});

  res.status(200).json(allNews);
};

module.exports = getNews;
