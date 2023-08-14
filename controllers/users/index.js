const { register } = require("./register");
const { login } = require("./login");
const { getCurrent } = require("./getCurrent");
const { logout } = require("./logout");
const { updateBySubscription } = require("./updateBySubscription");
const { updateAvatar } = require("./updateAvatar");
const { verifyEmail } = require("./verifyEmail");
const { resendVerifyEmail } = require("./resendVerifyEmail");

module.exports = {
    register,
    login,
    getCurrent,
    logout,
    updateBySubscription,
    updateAvatar,
    verifyEmail,
    resendVerifyEmail,
}