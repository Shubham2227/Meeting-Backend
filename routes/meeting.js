const express = require('express');
const bodyParser = require('body-parser');
const cors = require('../config/cors');
const router = express();
const authenticate = require('../config/auth');
const MeetingController = require('../controller/meeting').MeetingController;

router.use(bodyParser.json());

router.route('/new')
    .options(cors.corsWithOptions,(req,res) => res.sendStatus(200))
    .all(authenticate.verifyUser)
    .post(cors.corsWithOptions,MeetingController.createMeeting);

router.route('/get')
    .options(cors.corsWithOptions, (req,res) => res.sendStatus(200))
    .all(authenticate.verifyUser)
    .get(cors.corsWithOptions, MeetingController.getMeetings);

router.route('/edit/:meetingId')
    .options(cors.corsWithOptions, (req,res) => res.sendStatus(200))
    .all(authenticate.verifyUser)
    .put(cors.corsWithOptions, MeetingController.updateMeeting);

module.exports = router;