const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const connectDB = require("./config/db");

const authRoutes = require("./routes/auth-routes");
const adminRoutes = require("./routes/admin-routes");
const employeeRoutes = require("./routes/employee-routes");
const managerRoutes = require("./routes/manager-routes");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/manager", managerRoutes);
app.use("/api/employee", employeeRoutes);

app.get("/", (req, res) => {
    res.send("API is running... yay :)");
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
