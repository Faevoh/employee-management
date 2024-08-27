const adminModel = require("../Models/adminModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

exports.adminSignUp = async (req, res) => {
    try {
        const {organisation, email, password} = req.body;
        if (!organisation || !organisation.trim()){
            return res.status(422).json({
                message: "Organisation name is required"
            });
        }
        if (!email || !email.trim()){
            return res.status(422).json({
                message: "Email is required"
            });
        }
        if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)){
            return res.status(422).json({
                message: "Check email and input correct email address"
            });
        }
        const emailChecker = await adminModel.findOne({email})
        if (emailChecker){
            return res.status(409).json({
                message: "User with email already exists"
            });
        }
        const hashPassword = await bcrypt.hash(password, 15);

        const admin = {
            organisation,
            email,
            password: hashPassword
        }
        const newAdmin = await new adminModel(admin);
        newAdmin.save();
        
        return res.status(201).json({
            message: "Sign up Successful",
            data: newAdmin
        });
    } catch (error) {
        res.status(500).json({
            message: "Registration Failed",
            error: error.message
        });
    }
};

exports.adminLogin = async (req, res) => {
    try {
        const {email, password}= req.body;
        if (!email || !email.trim()){
            return res.status(422).json({
                message: "Email is required"
            });
        }
        if (!password || !password.trim()){
            return res.status(422).json({
                message: "Password is required"
            });
        }
        const user = await adminModel.findOne({email});
        if(!user){
            return res.status(404).json({
                message: "User not Found"
            });
        }
        const passwordChecker = await bcrypt.compare(password, user.password);
        if(!passwordChecker){
            return res.status(404).json({
                message: "Email or Password Incorrect"
            });
        }
        const generateToken = jwt.sign({
            id: user._id,
            role: user.role
        }, process.env.JWT_SECRET, {expiresIn: '1h'});
        const token = generateToken;

        return res.status(200).json({
            message: "Login Successful",
            token: token
        });
    } catch (error) {
        return res.status(500).json({
            message: "Login Failed",
            error: error.message
        });
    }
};
