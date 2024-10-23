const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const connectDB = require("./config/db");
const userRoutes = require("./routes/user-routes");
const taskRoutes = require("./routes/task-routes");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/user", userRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
    res.send("Task Management System API (simplified version) is up and running...");
});

app.use((req, res) => {
    res.status(404).json({ error: "404 Not Found: Sorry, the endpoint you requested could not be found. Please verify your request." });
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
