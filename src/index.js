import express from "express";
import ApiRouter from "./routes";

const app = express(
    express.json({
        limit: "10kb",
    })
);

// Port to listen to
const PORT = process.env.PORT || 8000;

// MongoDB connection string
const connectionString = process.env.MONGODB_URI;

const server = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        // Listen to specified port
        app.listen(port, console.log(`Server started on port ${port}...`));
    } catch (error) {
        console.log(error);
    }
};

// Start the server
server();
