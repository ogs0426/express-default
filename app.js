var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser  = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose    = require('mongoose');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/api/User');

var app = express();

var config = require('./config/dev_config');

// global
global.__project = 'default_server';
global.__env = 'dev';
global.__base = __dirname + '/';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger(__env));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

// CONNECT TO MONGODB SERVER
var db = mongoose.connection;

db.on('error', function() {
	console.log('Database connection error'.red);
});
db.on('connecting', function () {
	console.log('Database connecting'.cyan);
});
db.once('open', function() {
	console.log('Database connection established'.green);
});
db.on('reconnected', function () {
	console.log('Database reconnected'.green);
});

mongoose.connect(config.db_url, {server: {auto_reconnect: true}});

// route
app.use('/', indexRouter);
app.use('/user', userRouter);

// swagger
app.use(require('./routes/swagger'));

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
