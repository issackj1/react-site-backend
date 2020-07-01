const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const utility_mw = require('./middleware/utility');
const errors_mw = require('./middleware/errors');
const auth_mw = require('./middleware/authentication');
const routes = require('./routes/routes');

const whitelist = ['http://localhost:4000', 'http://3.94.8.68', '142.117.30.78'];
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
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(utility_mw.body_parser_json);
app.use(utility_mw.body_parser_url);
app.use(utility_mw.session);

app.use(auth_mw.hasUserSession);
app.use(auth_mw.attachLocals);

app.use(routes.auth_routes);
app.use(routes.error_routes);
app.use(routes.statisticsCanada_routes);
app.use(routes.index_routes);
app.use(routes.users_routes);

app.use(errors_mw.error_handler_404);
app.use(errors_mw.error_handler_500);

module.exports = app;
