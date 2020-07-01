require('../utils/links');
module.exports.error_handler_403 = function (req, res, next) {
    return res.status(404).json({ error: 'Forbidden request' });
};

module.exports.error_handler_404 = function (req, res, next) {
    return res.status(404).json({ error: 'Resource not found' });
};

module.exports.error_handler_500 = function (err, req, res, next) {
    console.log(err);
    return res.status(500).json({ error: 'Internal server error' });
};
