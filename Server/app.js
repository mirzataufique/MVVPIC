
const express = require('express');
const cors = require('cors'); 
const app = express();
app.use(cors());
// app.use(express.static('MVVPIC'));


const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoos = require('mongoose');
const connectDB = require('./MongoDb/conncetion');


const studentRoutes = require('./api/routes/student');
const userRoutes = require('./api/routes/user');


// middlewares---------->
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Mongo Db Connection
connectDB();


//Cors Error Handling
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE,');
        return res.status(200).josn({});
    }
    next();
});


// routes=====================================>

app.use('/student', studentRoutes);
app.use('/user', userRoutes);










//error handling if routes not found
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


module.exports = app;