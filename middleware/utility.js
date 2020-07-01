const body_parser = require('body-parser'),
    cors = require('cors'),
    express_session = require('express-session'),
    MongoDBSession = require('connect-mongodb-session')(express_session),
    _path = require('path');

const database = require('../utils/database'),
    path = require('../utils/path');

public_dir = path.getPublicDirectory();
log_path = path.getRootDirectory() + _path.sep + 'access.log';

module.exports.session = express_session({
    secret: "87B9AE7C11C6C949B51899916F3BB",
    resave: true,
    saveUninitialized: false,
    expires: new Date(Date.now() + (30 * 86400 * 1000)),
    store: new MongoDBSession({
        uri: database.DB_URI,
        collection: "sessions"
    }),
    cookie: {
        maxAge: Date.now() + (30 * 86400 * 1000)
    }
});

module.exports.body_parser_json = body_parser.json({ limit: '16384mb' });
module.exports.body_parser_url = body_parser.urlencoded({ extended: true, limit: '16384mb', parameterLimit: 500000 });
module.exports.cors = cors();
