const { ctrlWrapper } = require("../../helpers");

const getCurrent = async(req, res) => {
    const { name, email, subscription } = req.user;

    res.json({
        name,
        email,
        subscription,
    })
}

module.exports = {
    getCurrent: ctrlWrapper(getCurrent),
};