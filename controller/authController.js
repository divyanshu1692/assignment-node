const User = require("../models/User.js");
const { generateToken } = require("../utils/jwt");
const bcrypt = require("bcryptjs");

const signupController = async (username, email, password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        const token = generateToken(user);
        return { ...user._doc, token };
    } catch (error) {
        console.log("error while creating the user", error.message);
    }
}

const loginController = async (email, password) => {
    try {
        const user = await User.findOne({ email });
        const matchedPassword = await bcrypt.compare(password, user.password);
        
        if (!user || !(matchedPassword)) {
            throw new Error('Invalid credentials');
        }
        const token = generateToken(user);
        return { ...user._doc, token };
    } catch (error) {
        console.log("error while creating the user", error.message);
    }
}

module.exports = { signupController, loginController };