const { Pet } = require('../../models/petSchema');
const createError = require('http-errors');

const removePet = async (req, res) => {
  const { id } = req.params;

  const pet = await Pet.findByIdAndRemove(id);

  if (!pet) {
    throw new createError.NotFound(`Failure! pet with id: ${id} is not found`);
  }

  res.json({
    message: `Pet with name ${pet.name} successfully deleted`,
    id,
  });
};

module.exports = removePet;
