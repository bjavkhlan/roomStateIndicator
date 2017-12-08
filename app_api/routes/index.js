var express = require('express');
var router = express.Router();
var ctrlWorkers = require('../controllers/workers');

router.get('/route/workers', ctrlWorkers.workersList);
router.post('/route/workers', ctrlWorkers.changeWorkerState);

module.exports = router;


