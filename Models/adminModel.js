const mongoose = require("mongoose");

const admin = new mongoose.Schema({
    organisation: {type: String},
    email: {
        type: String,
        unique: true
    },
    password: {type: String},
    role: {
        type: String,
        default: 'admin'
    }
},{
    timestamps: true
});

adminModel = mongoose.model("admin", admin);
module.exports = adminModel;