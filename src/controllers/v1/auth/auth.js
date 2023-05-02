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

        return res.status(201).json({
            user: {
                username: newUser.username,
                email: newUser.email,
            }
         });

    } catch (error) {

        next(error);
    }
};

const login = async (req, res, next) => {

    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            // Handle the case when the user doesn't exist
            return res.status(404).json({ message: "User not found" });
        }

        // Validate the password
        if (!user.validPassword(password)) {
            // Handle the case when the password is incorrect
            return res.status(401).json({ message: "Invalid password" });
        }

        // Generate the JWT token
        const token = user.generateJWT();

        return res.status(200).json({
            message: "Login Successful",
            user: {
                username: user.username,
                email: user.email,
                token: token
            }
         });

    } catch (error) {

        next(error);
    }
};

const changePassword = async (req, res, next) => {
    const { email, oldPassword, newPassword } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            // Handle the case when the user doesn't exist
            return res.status(404).json({ message: "User not found" });
        }

        // Validate the old password
        if (!user.validPassword(oldPassword)) {
            // Handle the case when the old password is incorrect
            return res.status(401).json({ message: "Invalid old password" });
        }

        // Set the new password
        user.setPassword(newPassword);

        const token = user.generateJWT();

        // Save the updated user
        await user.save();

        return res
            .status(200)
            .json({
                message: "Password changed successfully",
                user: {
                    username: user.username,
                    email: user.email,
                    token: token
                }
            });

    } catch (error) {

        next(error);
    }
};

module.exports = {
    register,
    login,
    changePassword,
};
