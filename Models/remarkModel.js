const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const remark = new Schema({
    employee: { 
        type: Schema.Types.ObjectId, 
        ref: 'employee'
    },
    remark: {type: String},
    admin: {
        type: Schema.Types.ObjectId, 
        ref: 'admin'
    }
},
{
    timestamps: true
});

remarkModel = mongoose.model("remark", remark);
module.exports = remarkModel;