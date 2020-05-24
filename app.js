var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fs = require('fs');

var apiRouter = require('./routes/api/v1.0/main');
var cors = require('./middleware/cors');

require('dotenv').config();
require('./config').bootstrap();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors);

app.use('/api/v1.0', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err);

  // If we're within the API, send json
  if (req.originalUrl.match('^/api')) {
    res.status(err.status || 500);
    let msg = err.message;
    if (err.status === 404) {
        msg = 'Endpoint not found';
    }
    res.json({ code: 'UNEXPECTED', msg: msg });
  }

  // Otherwise, let React handle it
  else {
    res.sendFile(path.join(__dirname, 'public') + '/index.html');
  }
});

module.exports = app;
