const { User } = require("../../models/user");
const { ctrlWrapper, HttpError } = require("../../helpers");

const verifyEmail = async (req, res) => {

    const { verificationToken } = req.params;
    const user = await User.findOne({verificationToken});
    if(!user) {
        throw HttpError(401, "E-mail not found");
    }
    await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: "" });

    res.json({
        message: "E-mail successfully verified"
    })

}

module.exports = {
    verifyEmail: ctrlWrapper(verifyEmail),
}