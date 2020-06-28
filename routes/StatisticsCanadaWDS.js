const express = require('express');
const router  = express.Router();
const StatisticsCanadaWDSController = require('../controller/StatisticsCanadaWDSController');

router.post('/v1/getCubeMetaData/:productId', StatisticsCanadaWDSController.getCubeMetaData);
router.post('/v1/getDataFromVectorsAndLatestNPeriods/:vectorId/:latestN', StatisticsCanadaWDSController.getDataFromVectorsAndLatestNPeriods);
router.post('/v1/getDataFromCubePidCoordAndLatestNPeriods/:productId/:coordinate/:latestN', StatisticsCanadaWDSController.getDataFromCubePidCoordAndLatestNPeriods);
router.post('/v1/getChangedSeriesDataFromVector/:vectorId', StatisticsCanadaWDSController.getChangedSeriesDataFromVector);

module.exports = router;
