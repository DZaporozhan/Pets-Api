const News = require("../../models/news");

const getNews = async (req, res, next) => {
 
    
      try {console.log("getting news...");
        const allNews = await News.find({});

        res.status(200).json({
        code: 200,
        message: 'Success',
        data: allNews,
      });
      } catch (error) {
        next(error)
      }
};

module.exports = getNews;