const bcrypt = require('bcryptjs');
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const { User } = require("../../models/user");

const { ctrlWrapper, HttpError, sendEmail } = require("../../helpers");

const { BASE_URL } = process.env;

const register = async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email});
    if(user) {
        throw HttpError(409, "E-mail already in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationToken = nanoid();

    const newUser = await User.create({...req.body, password: hashPassword, avatarURL, verificationToken});

    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}"> Click verify email </a>`,
    }
    sendEmail(verifyEmail);

    res.status(201).json({
        name: newUser.name,
        email: newUser.email,
    })
};

module.exports = {
    register: ctrlWrapper(register),
}