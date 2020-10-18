const express = require('express');
const app = express();
const db = require('./config/db');
const bodyParser = require('body-parser');
const logger = require('morgan');
const userRouter = require('./routes/user');
const meetingRouter = require('./routes/meeting');

app.use(bodyParser.json());
app.use(logger('dev'));

app.use((req,res,next) => {
    res.setHeader('Content-Type','application/json');
    res.statusCode = 200;
    next();
});

app.use('/api/user', userRouter);
app.use('/api/meeting', meetingRouter);

app.use((err,req,res,next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.json({status : false, message : err.message});
});

app.listen(3000, 'localhost', () => {
    console.log('Server started listening on 3000');
});