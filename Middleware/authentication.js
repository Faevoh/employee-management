const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const ADMIN = require('../Models/adminModel');

dotenv.config();

exports.authenticateToken = async(req, res, next) => {
    try {
        const token = req.header('Authorization').replace("Bearer ", "");
        if(!token){
            return res.status(401).json({
                message: "Access denied. No token provided."
            });
        }
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await ADMIN.findById(decodeToken.id);
        if(!admin){
            return res.status(401).json({
                message: 'Unauthorized',
                error: error.message
            });
        }

        req.user = admin;
        next();
    } catch (error) {
        return res.status(400).json({
            message: 'Invalid token',
            error: error.message
        });
    }
}