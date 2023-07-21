const { User } = require("../../models/user");

const { HttpError } = require("../../helpers");

const updateBySubscription = async (req, res, next) => {
    try {
        const { subscription } = req.body;
        const { _id } = req.user;
        const user = await User.findByIdAndUpdate( _id, req.body, {new: true});

        if(!user) {
            next(HttpError(401));
        }

        res.json({ subscription: user.subscription});
        
    } catch (error) {
        next(error)
    }
};

module.exports = {
    updateBySubscription
  };