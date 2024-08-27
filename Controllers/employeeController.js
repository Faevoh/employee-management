const employeeModel = require('../Models/employeeModel');
const departmentModel = require('../Models/departmentModel')

exports.createEmployee = async (req, res) => {
    try {
        const adminId = req.user.id;
        const {name, email, position, address, phoneNumber} = req.body;
        if (!name || !name.trim()){
            return res.status(422).json({
                message: "Name is required"
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
        const emailChecker = await employeeModel.findOne({email})
        if (emailChecker){
            return res.status(409).json({
                message: "Employee with email already exists"
            });
        }
        if (!position || !position.trim()){
            return res.status(422).json({
                message: "Position name is required"
            });
        }
        if (!address || !address.trim()){
            return res.status(422).json({
                message: "Address is required"
            });
        }
        if (!phoneNumber || !phoneNumber.trim()){
            return res.status(422).json({
                message: "Phone Number is required"
            });
        }
        const departmentId = req.params.departmentId;
        if(!departmentId){
            return res.status(404).json({
                message: "Params is missing department ID"
            });
        }
        const findDepartment = await departmentModel.findById(departmentId)
        if(!findDepartment){
            return res.status(404).json({
                message: "Department does not exist, consider creating the department first",
            });
        }
        const employee ={
            name,
            email,
            position,
            address,
            phoneNumber,
            admin: adminId
        }
        const newEmployee = new employeeModel(employee);
        newEmployee.department = findDepartment._id;
        newEmployee.save();
        findDepartment.employees.push(newEmployee._id);
        findDepartment.save();

        return res.status(201).json({
            message: "Employee created Successfully",
            data: newEmployee
        });
    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while creating employee",
            error: error.message
        });
    }
};

exports.getAllEmployees = async(req, res) => {
    try {
        try {
            const adminId = req.user.id;
            const employees = await employeeModel.find({admin: adminId});
            if(!employees){
                return res.status(404).json({
                    message: "Employees have not been created"
                });
            }
            return res.status(200).json({
                message: `${employees.length} employees`,
                data: employees
            });
        } catch (error) {
            res.status(500).json({
                message: "An error occured while fetching departments",
                error: error.message
            });
        }
    } catch (error) {
        
    }
};

exports.getSingleEmployee = async(req, res) => {
    try {
        const adminId = req.user.id;
        const employeeId = req.params.employeeId;
        if(!employeeId){
            return res.status(404).json({
                message: "params is missing employee's ID"
            });
        }
        const employee = await employeeModel.findOne({_id: employeeId, admin: adminId});
        if(!employee){
            return res.status(404).json({
                message: "Employee does not exist"
            });
        }
        return res.status(200).json({
            message: `${employee.name}'s Profile`,
            data: employee
        });
    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while fetching employee",
            error: error.message
        });
    }
};

exports.updateEmployee = async(req, res) =>{
    try {
        const adminId = req.user.id;
        const employeeId = req.params.employeeId;
        if(!employeeId){
            return res.status(404).json({
                message: "params is missing employee's ID"
            });
        }
        const employee = await employeeModel.findOne({_id: employeeId, admin: adminId});
        if(!employee){
            return res.status(404).json({
                message: "Employee does not exist"
            });
        }
        const data = req.body;
        if(!data){
            return res.status(400).json({
                message: "You are not sending any data to update"
            });
        }
        const employeeInfo = await employeeModel.findByIdAndUpdate(employeeId ,data, {new: true});

        return res.status(200).json({
            message: "Employee updated Successfully",
            data: employeeInfo
        });
    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while updating employee"
        });
    }
};

exports.deactivateEmployee = async(req, res) => {
    try {
        const adminId = req.user.id;
        const employeeId = req.params.employeeId;
        if(!employeeId){
            return res.status(404).json({
                message: "params is missing employee's ID"
            });
        }
        const employee = await employeeModel.findOne({ _id: employeeId, admin: adminId });
        if (!employee) {
            return res.status(404).json({
                message: "Employee does not exist"
            });
        }
        const updateEmployee = await employeeModel.findByIdAndUpdate(employeeId, {IsActive: false}, {new: true});
        if(!updateEmployee){
            return res.status(404).json({
                message: "Employee does not exist"
            });
        }

        return res.status(200).json({
            message: "Employee deactivated successfully",
            data: updateEmployee
        });
    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while deactivating employee"
        });
    }
};