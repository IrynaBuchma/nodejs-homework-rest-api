const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const { ctrlWrapper, HttpError } = require("../../helpers");
const { User } = require("../../models/user");

const avatarsDir = path.join(__dirname,"../../", "public", "avatars");

const updateAvatar = async(req, res) => {
    try {
        const { _id } = req.user;
        const {path: tmpUpload, originalname } = req.file;
        const filename = `${_id}_${originalname}`;
        const resultUpload = path.join(avatarsDir, filename);

        const image = await Jimp.read(tmpUpload);
        await image.resize(250, 250).writeAsync(tmpUpload);

        await fs.rename(tmpUpload, resultUpload);
        const avatarURL = path.join("avatars", filename);
        const user = await User.findByIdAndUpdate(_id, {avatarURL});

        if (!user) {
            throw HttpError(401);
        }

        res.json({
            avatarURL,
        })
        
    } catch (error) {
        await fs.unlink(req.file.path);
        return next(error); 
    }
}

module.exports = {
    updateAvatar: ctrlWrapper(updateAvatar),
};