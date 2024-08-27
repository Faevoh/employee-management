const express = require('express');
const { addRemark, getEmployeeRemarks } = require('../Controllers/remarkController');
const { authenticateToken } = require('../Middleware/authentication');

const remarkRouter = express.Router();

remarkRouter.route('/employee-management/admin/remarks/:employeeId').post(authenticateToken,addRemark);
remarkRouter.route('/employee-management/admin/remarks/:employeeId').get(authenticateToken,getEmployeeRemarks);


module.exports = remarkRouter;