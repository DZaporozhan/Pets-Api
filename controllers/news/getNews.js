const News = require("../../models/news");

const getNews = async (req, res, next) => {
 console.log("getting news...");
    const allNews = await News.find({});

        res.status(200).json({
        code: 200,
        message: 'Success',
        data: allNews,
      });
     
};

module.exports = getNews;