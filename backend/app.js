const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require ("cors");
const userAPI = require("./routes/user")
const taskAPI = require("./routes/task")
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1", userAPI);
app.use("/api/v2", taskAPI);
// Middleware to parse JSON (if needed)


// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI,);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1);
    }
};

connectDB();



// Define a route
app.get("/", (req, res) => {
    res.send("hello world");
});

// Define the /conn route
app.get("/conn", (req, res) => {
    res.send("Connection successful");
});

// Set the port
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
