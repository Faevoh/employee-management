const mongoose = require("mongoose");

const remark = new mongoose.Schema({
    employeeId: { 
        type: Schema.Types.ObjectId, 
        ref: 'employee'
    },
    remark: {type: String}
},
{
    timestamps: true
});

remarkModel = mongoose.model("remark", remark);
module.exports = remarkModel;