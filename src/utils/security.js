const crypto = require("crypto");

const generateSalt = () => {
    return crypto.randomBytes(16).toString("hex");
};

const hashPassword = (password, salt) => {
    return crypto
        .pbkdf2Sync(password, salt, 10000, 512, "sha512")
        .toString("hex");
};

module.exports = {
    generateSalt,
    hashPassword,
};
