const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { generateSalt, hashPassword } = require('../utils/security');
const { secret } = require('../config/jwt');

const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, "cannot be blank"],
        unique: true,
    },
    email: {
        type: String,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please enter a valid email address",
        ],
        required: [true, "cannot be blank"],
    },
    passwordHash: String,
    passwordSalt: String,
});

UserSchema.methods.setPassword = function (password) {
    this.passwordSalt = generateSalt();
    this.passwordHash = hashPassword(password, this.passwordSalt);
};

UserSchema.methods.validPassword = function (password) {
    return this.passwordHash === hashPassword(password, this.passwordSalt);
};

UserSchema.methods.generateJWT = function () {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign(
        {
            userid: this._id,
            username: this.username,
            iat: Math.floor(today.getTime() / 1000),
            exp: Math.floor(exp.getTime() / 1000),
        },
        secret
    );
};

UserSchema.methods.verifyJWT = function (token) {
    try {
        jwt.verify(token, secret);
        return true;
    } catch (err) {
        return false;
    }
};

module.exports = mongoose.model("User", UserSchema);
