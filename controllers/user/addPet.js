const { Pet, joiAddingPetSchema } = require('../../models/petSchema');

const addPet = async (req, res) => {
  const { error } = joiAddingPetSchema.validate(req.body);
  if (error) {
    error.status = 400;
    throw error;
  }

  const { _id: userId } = req.user;

  const pet = await Pet.create({
    ...req.body,
    owner: userId,
  });
  res.status(201).json(pet);
};

module.exports = addPet;
