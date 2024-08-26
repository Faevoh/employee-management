const mongoose = require("mongoose");
const Schema = mongoose.Schema

const employee = new Schema({
    name: {type: String},
    email: {
        type: String,
        unique: true
    },
    password: {type: String},
    position: {type: String},
    address: {type: String},
    phoneNumber: {type: String},
    IsActive: {
        type: Boolean,
        default: true
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: "department"
    },
    remark: { 
        type: Schema.Types.ObjectId, 
        ref: 'remark'
    }
},{
    timestamps: true
});

employeeModel = mongoose.model("employee", employee);
module.exports = employeeModel;