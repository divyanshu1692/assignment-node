const { verifyToken } = require('../utils/jwt.js');
const User = require('../models/User.js');

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization || '';
    if (token) {
        try {
            const decoded = verifyToken(token);
            const user = await User.findById(decoded.id);
            req.user = user;
        } catch (error) {
            console.error('Invalid Token');
        }
    }
    next();
};

module.exports = authMiddleware;