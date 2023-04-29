const User = require("../../../models/user");

const register = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        // Check if the user exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            // Handle the case when the user already exists
            return res.status(409).json({ message: "User already exists" });
        }

        const newUser = new User({ username, email });
        newUser.setPassword(password);
        await newUser.save();

        const token = newUser.generateJWT();

        return res.status(201).json({ token });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
};
