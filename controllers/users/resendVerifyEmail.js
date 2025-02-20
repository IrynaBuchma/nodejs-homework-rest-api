const { User } = require("../../models/user");
const { ctrlWrapper, HttpError } = require("../../helpers");

const resendVerifyEmail = async (req, res) => {

   const { email } = req.body;
   const user = await User.findOne({email});
   if(!user) {
        throw HttpError(400, "Missing required field email");
   }
   if(user.verify) {
        throw HttpError(400, "Verification has already been passed");
   }

   const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}"> Click verify email </a>`,
    }

    sendEmail(verifyEmail);

    res.status(200).json({
        message: "Verification email sent"
    })

}

module.exports = {
    resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
}