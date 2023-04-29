const { register } = require("../auth/auth");

const addUser = async (req, res, next) => {
    try {
        await register(req, res, next);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    addUser,
};
