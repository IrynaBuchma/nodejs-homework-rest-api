const { register } = require("./register");
const { login } = require("./login");
const { getCurrent } = require("./getCurrent");
const { logout } = require("./logout");
const { updateBySubscription } = require("./updateBySubscription");

module.exports = {
    register,
    login,
    getCurrent,
    logout,
    updateBySubscription,
}