const { Notices } = require("../../models/noticesSchema");
const createError = require("http-errors");

const getNoticeByCategory = async (req, res) => {
    const { category, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const result = await Notices.find({ category }, "-createdAt -updatedAt", { skip, limit })
    
    const categoryList = ["sell", "lost/found", "in good hands"];
    const key = categoryList.includes(category);
    if (!key) {
        throw new createError.BadRequest("this category is not exist")
    }

    if (!result ) {
        throw new createError.NotFound("not found")
    }
    res.json({
        status: "success",
    code: 200,
    data: {
      result,
    },
    })
    
};

module.exports = getNoticeByCategory;