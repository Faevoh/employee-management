const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use('/api/v1',)


app.get('/', (req, res) => {
    res.status(200).send('A Simple Employee Management System');
});

module.exports = app;