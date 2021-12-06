'use strict';

const express = require('express');
const app = express();
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const serverRoutes = require('./server/routes/router');
dotenv.config({
    path: 'config.env'
});
const PORT = process.env.PORT || 3000;
const connectDB = require('./server/database/connection');

// log requests
// app.use(morgan('tiny'));

//connect to db
connectDB();

// parse requests
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

// set template engine
app.set("view engine", "ejs");

// load assets
app.use('/css', express.static(path.join(__dirname, '/assets', '/css')));
app.use('/img', express.static(path.join(__dirname, '/assets', '/img')));
app.use('/js', express.static(path.join(__dirname, '/assets', '/js')));

// routers
app.use(serverRoutes);

app.listen(PORT, () => console.log(`Server started at port: ${PORT}...`));