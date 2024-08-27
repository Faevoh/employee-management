const mongoose = require("mongoose");
const Schema = mongoose.Schema

const department = new Schema({
    department: {type: String},
    employees: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'employee'
    }],
    admin: {
        type: Schema.Types.ObjectId, 
        ref: 'admin'
    }
},
{
    timestamps: true
});

departmentModel = mongoose.model("department", department);
module.exports = departmentModel;