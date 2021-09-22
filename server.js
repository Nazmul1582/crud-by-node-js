const express = require('express');
const app = express();
const studentRoutes = require('./routes/student');
// const isAuth = require('./middlware');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require('dotenv').config();

let limiter = rateLimit({
    windowMs: 1 * 60 * 1000, 
    max: 10,
    message: 'Too many request, Please try again later.'
})

app.use(bodyParser.json());
app.use(limiter);

app.use(morgan('tiny'));
// app.use(isAuth);

app.use(studentRoutes);

app.get('/', (req, res) =>{
    res.send('<h1>Hello Programmer!</h1>')
})

app.get('*', (req, res) => {
    res.send('<h1>No API found with this route</h1>')
})

// Database Connection
mongoose.connect("mongodb://localhost:27017/studentinfo")
    .then(() => console.log("Database connected successfully"))
    .catch(error => console.log(error));
// server
const port = process.env.PORT || 3000
app.listen(port, console.log(`Server is running at port ${port}`))