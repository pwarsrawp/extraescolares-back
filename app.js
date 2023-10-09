require("dotenv").config();
require("./db");
const express = require("express");
const app = express();
require("./config")(app);



//////////////MAIN ROUTES///////////////

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const usersRoutes = require("./routes/users.routes");
app.use("/users", usersRoutes);

const studentsRoutes = require("./routes/students.routes");
app.use("/students", studentsRoutes);

const activitiesRoutes = require("./routes/activities.routes");
app.use("/activities", activitiesRoutes);


require("./error-handling")(app);

module.exports = app;
