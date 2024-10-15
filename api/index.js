const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const connectDB = require("./config/db");
const createAdmin = require("./config/admin-setup");
const authRoutes = require("./routes/auth-routes");
const adminRoutes = require("./routes/admin-routes");
const employeeRoutes = require("./routes/employee-routes");
const managerRoutes = require("./routes/manager-routes");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
createAdmin();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/manager", managerRoutes);
app.use("/api/employee", employeeRoutes);

app.get("/", (req, res) => {
    res.send("Task Management System API is up and running... :)");
});

app.use((req, res) => {
    res.status(404).json({ error: "404 Not Found: Sorry, the endpoint you requested could not be found. Please verify your request." });
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
