const express = require('express');
const { adminSignUp, adminLogin } = require('../Controllers/adminController');

const adminRouter = express.Router();

adminRouter.route('/employee-management/admin/register').post(adminSignUp);
adminRouter.route('/employee-management/admin/signin').post(adminLogin);

module.exports = adminRouter;