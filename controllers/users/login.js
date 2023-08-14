const bcrypt = require('bcryptjs');

const { User } = require("../../models/user");

const { ctrlWrapper, HttpError } = require("../../helpers");

const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const login = async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email});
    if(!user) {
        throw HttpError(401, "E-mail or password is wrong");
    }
    if(!user.verify) {
        throw HttpError(401, "E-mail not verified");
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if(!comparePassword) {
        throw HttpError(401, "E-mail or password is wrong");
    }

    const payload = {
        id: user.id,
    }

    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "24d"});
    await User.findByIdAndUpdate(user._id, {token});

    res.json({
        token,
    })
}

module.exports = {
    login: ctrlWrapper(login),
}