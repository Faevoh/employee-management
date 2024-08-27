const express = require('express');
const { createEmployee, getAllEmployees, getSingleEmployee, updateEmployee, deactivateEmployee } = require('../Controllers/employeeController');
const { authenticateToken } = require('../Middleware/authentication');

const employeeRouter = express.Router();

employeeRouter.route("/employee-management/admin/employees/:departmentId").post(authenticateToken,createEmployee);
employeeRouter.route("/employee-management/admin/employees").get(authenticateToken,getAllEmployees);
employeeRouter.route("/employee-management/admin/employees/:employeeId").get(authenticateToken,getSingleEmployee);
employeeRouter.route("/employee-management/admin/employees/:employeeId").put(authenticateToken,updateEmployee);
employeeRouter.route("/employee-management/admin/employees/:employeeId").patch(authenticateToken,deactivateEmployee);

module.exports = employeeRouter;