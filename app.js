const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const cors = require('cors');
const axios = require('axios');
const whitelist = ['http://localhost:3000/react-site#/', 'http://localhost:3000'];
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
};

const app = express();

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/api/v1/test', function (req, res) {
    res
        .status(200)
        .send({
            message: 'This is a test',
        })
});

app.get('/api/v1/test1', function (req, res) {
    console.log('hey one');
    axios.get("https://www150.statcan.gc.ca/t1/wds/rest/getChangedSeriesList", {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'user_key': process.env.user_key
        }
    })
        .then(
            (result) => {
                res
                    .status(200)
                    .send(result.data);
            },
            (error) => {
                res
                    .status(error.status)
                    .send(error.data)
            }
        );
});

module.exports = app;
