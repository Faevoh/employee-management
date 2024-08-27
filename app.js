const express = require("express");
const adminRouter = require("./Routes/adminRoute");
const depertmentRouter = require("./Routes/departmentRoute");
const employeeRouter = require("./Routes/employeeRoute");
const remarkRouter = require("./Routes/remarkRoute");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/v1',adminRouter);
app.use('/api/v1',depertmentRouter);
app.use('/api/v1',employeeRouter);
app.use('/api/v1',remarkRouter);


app.get('/', (req, res) => {
    res.status(200).send('A Simple Employee Management System');
});

module.exports = app;