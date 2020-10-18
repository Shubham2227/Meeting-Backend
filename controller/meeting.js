const express = require('express');
const bodyParser = require('body-parser');
const router = express();
const Meeting = require('../models/meeting');

router.use(bodyParser.json());

module.exports.MeetingController = { 
        createMeeting : (req,res,next) => {
            let body = req.body;
            let meeting = new Meeting({
                title : body.title,
                date : body.date,
                organiser : req.user._id
            });

            meeting.save()
                   .then(m => {
                        res.json({ status : true, message : 'Meeting Created!', meeting : m })
                   })
                   .catch(err => next(err));
        },
        getMeetings : (req,res,next) => {
                Meeting.find( { organiser : req.user._id })
                    .then(meetings => {
                        res.json({ status : true, message : true, meetings : meetings});
                    })
                    .catch(err => next(err));
        },
        updateMeeting : (req,res,next) => {
            let body = req.body;
            Meeting.findOne({ _id : req.params.meetingId, organiser : req.user._id })
                .then(meeting => {
                    if(!meeting){
                        let error = new Error('Invalid Meeting Id');
                        error.status = 404;
                        throw error;
                    }
                    if(body.title) {
                        meeting.title = body.title;
                    }
                    if(body.date) {
                        meeting.date = body.date;
                    }
                    meeting.save()
                           .then(m => {
                                res.json({ status : true, message : 'Meeting Updated!', meeting : m });
                           })
                           .catch(err => next(err));
                })
                .catch(err => next(err));
        }
}