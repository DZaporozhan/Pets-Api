const { User } = require("../../models/user");
const {Notices} = require("../../models/noticesSchema");
const createError = require("http-errors");




const getFavoriteNotices = async (req, res) => { 
    const { _id} = req.user;
    const user = await User.findOne({ _id });
    const idArray = user.favorite.map(favorite => { return favorite.toString() });
    const favorites = await Notices.find({ _id: idArray });  

   if (!favorites) {       
        const error = new Error();
         throw new createError.NotFound(404, 'You have no any favorite notices'); 
    }
   
       res.status(200).json(favorites);
    
    
   
}

module.exports = getFavoriteNotices;