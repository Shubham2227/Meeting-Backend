const mongoose = require('mongoose');
const User = require('./user');
const Schema = mongoose.Schema;

const meetingSchema = new Schema({
    title : {
        required : true,
        type : String
    },
    date : {
        required : true,
        type : mongoose.Schema.Types.Date
    },
    organiser : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
        index : true
    },
    attendies : [{ type : mongoose.Schema.Types.ObjectId, ref : 'User'}]
}, 
{
    timestamps : true
});

module.exports = mongoose.model('Meeting', meetingSchema);
