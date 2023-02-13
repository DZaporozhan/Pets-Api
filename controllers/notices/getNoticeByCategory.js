const { Notices } = require('../../models/noticesSchema');
const createError = require('http-errors');

const getNoticeByCategory = async (req, res) => {
  const { category, page = 1, limit = 10, title } = req.query;
  const skip = (page - 1) * limit;

  let result = await Notices.find({ category }, '-createdAt -updatedAt', {
    skip,
    limit,
  });

  if (title) {
    const facts = await Notices.find({ category }, '-createdAt -updatedAt');
    const factsFilter = facts.filter((fact) =>
      fact.title.toLowerCase().includes(title.toLowerCase())
    );
    result = factsFilter;
  }

  const categoryList = ['sell', 'lost found', 'in good hands'];
  const key = categoryList.includes(category);
  if (!key) {
    throw new createError.BadRequest('BadRequest: This category doesn`t exist');
  }

  if (!result) {
    throw new createError.NotFound('not found');
  }

  if (!result.length) {
    throw new createError.NotFound(
      `Bad Request: Notices with title = ${title} not found!`
    );
  }

  res.json({
    status: 'Success',
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getNoticeByCategory;
