const { User } = require("../../models/user");
const { ctrlWrapper } = require("../../helpers");

const logout = async(req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, {token: ""});

    res.json({
       message: "Logout successful"
    })
}

module.exports = {
    logout: ctrlWrapper(logout),
};