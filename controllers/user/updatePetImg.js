const { Pet } = require('../../models/petSchema');
const createError = require('http-errors');

const updatePetImg = async (req, res) => {
  const { id } = req.params;

  const { imageURL } = req.body;

  console.log(imageURL);

  const pet = await Pet.findByIdAndUpdate(id, { imageURL });

  if (!pet) {
    throw new createError.NotFound(`Failure! pet with id: ${id} is not found`);
  }

  res.json({
    message: `Your pet ${pet.name} image successfully updated`,
    imageURL,
  });
};

module.exports = updatePetImg;
