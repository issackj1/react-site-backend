const axios = require('axios');

module.exports.getCubeMetaData = (req, res, next) => {
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
                productId: req.params.productId,
            }
        ]
    })
        .then(
            (result) => {
                res
                    .status(result.status)
                    .send(result.data);
            },
            (error) => {
                res
                    .status(error.response.status)
                    .send(error.response.data)
            }
        );
};

module.exports.getDataFromVectorsAndLatestNPeriods = (req, res, next) => {
    res
        .status(200)
        .send("getDataFromVectorsAndLatestNPeriods")

};

module.exports.getDataFromCubePidCoordAndLatestNPeriods = (req, res, next) => {
    res
        .status(200)
        .send("getDataFromCubePidCoordAndLatestNPeriods")
};

module.exports.getChangedSeriesDataFromVector = (req, res, next) => {
    res
        .status(200)
        .send("getDataFromVectorsAndLatestNPeriods")
};

