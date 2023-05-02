const express = require("express");
const cookieParser = require("cookie-parser");
const dbConnection = require("./config/db");
const ApiRouter = require("./routes");

const app = express();

require("dotenv").config();

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

// Define and mount standard route on the app
app.use("/api", ApiRouter);

// Port to listen to
const PORT = process.env.PORT || 8000;

// MongoDB connection string
const connectionString = process.env.MONGODB_URI;

const server = async () => {
    try {
        await dbConnection(connectionString);
        // Listen to specified port
        app.listen(PORT, () =>
            console.log(`Server started on port ${PORT}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

// Start the server
server();
