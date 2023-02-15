const { Notices } = require('../../models/noticesSchema');
const createError = require('http-errors');

const getFavoriteNotices = async ({ _id, query, user }, res) => {
  const { page = 1, limit = 50, title } = query;

  const skip = (page - 1) * limit;

  const idArray = user.favorite.map((favorite) => {
    return favorite.toString();
  });

  let total = await Notices.countDocuments({ _id: idArray });

  let data = await Notices.find({ _id: idArray }, '', {
    skip,
    limit: Number(limit),
  });

  if (title) {
    const facts = await Notices.find({ _id: idArray });
    const factsFilter = facts.filter((fact) =>
      fact.title.toLowerCase().includes(title.toLowerCase())
    );
    data = factsFilter;
    total = factsFilter.length;
  }

  if (!data) {
    throw new createError.NotFound(404, 'You have no any favorite notices');
  }

  res.status(200).json({ data, total });
};

module.exports = getFavoriteNotices;
