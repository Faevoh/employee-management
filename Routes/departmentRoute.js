const express = require('express');
const { createDepartment, getAllDepartments, getSingleDepartment } = require('../Controllers/departmentController');
const { authenticateToken } = require('../Middleware/authentication');

const depertmentRouter = express.Router();

depertmentRouter.route("/employee-management/admin/departments").post(authenticateToken,createDepartment);
depertmentRouter.route("/employee-management/admin/departments").get(authenticateToken,getAllDepartments);
depertmentRouter.route('/employee-management/admin/departments/:departmentId').get(authenticateToken,getSingleDepartment);

module.exports = depertmentRouter;