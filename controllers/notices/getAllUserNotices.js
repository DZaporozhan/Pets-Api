const { Notices } = require("../../models/noticesSchema");

const getAllUserNotices = async ({ user, query }, res) => {
  const { page = 1, limit = 50, title } = query;

  const skip = (page - 1) * limit;

  let total = await Notices.countDocuments({ owner: user.id });

  let data = await Notices.find({ owner: user.id }, "-createdAt -updatedAt", {
    skip,
    limit: Number(limit),
  }).sort({ createdAt: -1 });

  if (title) {
    const facts = await Notices.find({ owner: user.id });
    const factsFilter = facts.filter((fact) =>
      fact.title.toLowerCase().includes(title.toLowerCase())
    );
    data = factsFilter;
    total = factsFilter.length;
  }

  res.json({ data, total });
};

module.exports = getAllUserNotices;
