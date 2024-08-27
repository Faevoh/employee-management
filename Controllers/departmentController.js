const departmentModel = require("../Models/departmentModel");

exports.createDepartment = async(req, res) => {
    try {
        const adminId = req.user.id;
        const {department} = req.body;
        if (!department || !department.trim()){
            return res.status(422).json({
                message: "Department name is required"
            });
        }
        const checkDepartment = await departmentModel.findOne({department});
        if(checkDepartment){
            return res.status(409).json({
                message: "This Department already exists"
            });
        }
        const Department = {
            department,
            admin: adminId
        };
        const newDepartment = await departmentModel(Department);
        newDepartment.save();

        return res.status(201).json({
            message: "New Department Created",
            data: newDepartment
        });
    } catch (error) {
        return res.status(500).json({
            message: 'An error occured while creating Department',
            error: error.message
        });
    }
};

exports.getAllDepartments = async(req, res) => {
    try {
        const adminId = req.user.id
        const departments = await departmentModel.find({admin: adminId});
        if(!departments){
            return res.status(404).json({
                message: "Departments have not been created"
            });
        }
        return res.status(200).json({
            message: `${departments.length} departments`,
            data: departments
        });
    } catch (error) {
        res.status(500).json({
            message: "An error occured while fetching departments",
            error: error.message
        });
    }
};

exports.getSingleDepartment = async(req, res) => {
    try {
        const adminId = req.user.id
        const departmentId = req.params.departmentId;
        if(!departmentId){
            return res.status(404).json({
                message: "params is missing department ID"
            });
        }
        const department = await departmentModel.findOne({_id: departmentId, admin: adminId})
            .populate({
                path: 'employees',
                select: 'name position IsActive'
            });
        if(!department){
            return res.status(404).json({
                message: "Department does not exist"
            });
        }
        return res.status(200).json({
            message: `There are ${department.employees.length} employees in the ${department.department} department`,
            data: department
        });
    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while fetching department",
            error: error.message
        });
    }
};