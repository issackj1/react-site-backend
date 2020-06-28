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
        .json({
            message: 'This is a test',
        })
});

app.get('/api/v1/getCubeMetaData/:id', function (req, res) {
    axios({
        method: 'post',
        url: 'https://statcan-web-data-service-statcan.api.canada.ca/v1/getCubeMetadata',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'user_key': process.env.user_key
        },
        responseType: 'json',
        data: [
                {
                    productId: req.params.id,
                }
            ]
    })
        .then(
            (result) => {
                res
                    .status(result.status)
                    .send(result.data[0]);
            },
            (error) => {
                res
                    .status(error.response.status)
                    .send(error.response.data)
            }
        );
});

module.exports = app;
