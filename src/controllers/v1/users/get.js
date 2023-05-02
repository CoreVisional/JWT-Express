const User = require('../../../models/user');

const getAllUsers = async (req, res) => {

    try {

        const users = await User.find({}).select("-passwordHash -passwordSalt");

        res.status(200).json({
            status: 'success',
            data: {
                users
            }
        })

    } catch(error) {

        res.status(500).json({
            error: error.message
        })
    }
};

module.exports = {
    getAllUsers,
};
