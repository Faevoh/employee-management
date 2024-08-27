const remarkModel = require('../Models/remarkModel');
const employeeModel = require('../Models/employeeModel');

exports.addRemark = async(req, res) => {
    try {
        const adminId = req.user.id;
        const {remark} = req.body;
        if (!remark || !remark.trim()){
            return res.status(422).json({
                message: "Remark is required"
            });
        }
        const employeeId = req.params.employeeId;
        if(!employeeId){
            return res.status(404).json({
                message: "Params is missing employee's ID"
            });
        }
        const findEmployee = await employeeModel.findOne({_id: employeeId, admin: adminId});
        if(!findEmployee){
            return res.status(404).json({
                message: "Employee does not exist",
            });
        }
        const remarkData = {
            employee: employeeId,
            remark
        }
        const newRemark = new remarkModel(remarkData);
        newRemark.save();
        findEmployee.remark.push(newRemark._id);
        await findEmployee.save();

        return res.status(201).json({
            message: "Remark added successfully",
            data: newRemark
        });

    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while adding remark",
            error: error.message
        });
    }
};

exports.getEmployeeRemarks = async(req, res) => {
    try {
        const adminId = req.user.id;
        const employeeId = req.params.employeeId;
        if (!employeeId) {
            return res.status(404).json({
                message: "Params are missing employee's ID"
            });
        }
        const employeeRemarks = await employeeModel.findOne({_id: employeeId, admin: adminId})
            .populate({
                path: 'remark', 
                select: 'remark createdAt'
            });

        if (!employeeRemarks) {
            return res.status(404).json({
                message: "Employee does not exist"
            });
        }

        return res.status(200).json({
            message: "Employee remarks retrieved successfully",
            data: employeeRemarks.remark
        });
    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while retrieving employee's remarks",
            error: error.message
        });
    }
};