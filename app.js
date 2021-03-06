var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/usersRouter');
var recordsRouter = require('./routes/recordsRouter');

var app = express();

//connect MongoDB server and set up database connection
const mongoose = require('mongoose');
const username = 'trtai';
const password = 'tai123456';
const database = 'iTrailServer';
const options = { useNewUrlParser: true,  useUnifiedTopology: true};
const url = `mongodb+srv://${username}:${password}@cluster0.rrugn.mongodb.net/${database}?retryWrites=true&w=majority`;
const connect = mongoose.connect(url, options);
connect.then((db) => {
  console.log("Connected correctly to server!");
}).catch((err) => {
  console.log(err);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users/', usersRouter);
app.use('/records/', recordsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
