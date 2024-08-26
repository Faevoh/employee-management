const mongoose = require("mongoose");

const admin = new mongoose.Schema({
    organisation: {type: String},
    name: {type: String},
    email: {
        type: String,
        unique: true
    },
    password: {type: String}
},{
    timestamps: true
});

adminModel = mongoose.model("admin", admin);
module.exports = adminModel;