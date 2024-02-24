require('dotenv').config();
require('./db');
const express = require('express');
const app = express();
require('./config')(app);

//////////////MAIN ROUTES///////////////

const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

const usersRoutes = require('./routes/usersRoutes');
app.use('/users', usersRoutes);

const studentsRoutes = require('./routes/studentsRoutes');
app.use('/students', studentsRoutes);

const activitiesRoutes = require('./routes/activitiesRoutes');
app.use('/activities', activitiesRoutes);

require('./error-handling')(app);

module.exports = app;
