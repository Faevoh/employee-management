const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config();

const port = process.env.PORT;
const database = process.env.DATABASE;

const databaseConnection = async () => {
    try {
        const db = await mongoose.connect(database);
        console.log("Mongoose is Connected");

        app.listen(port, () => {
            console.log(`Server is connected and active on port:${port}`);
        });
    } catch (error) {
        console.log(`Database error: ${error}`);
    }
};

databaseConnection();

