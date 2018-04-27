var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var leaderRouter = require('./routes/leaderRouter');
var visitorRouter = require('./routes/visitorRouter');
var employeeRouter= require('./routes/employeeRouter');
//mongo start code
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const leaders = require('./models/leaders');
const visitors= require('./models/visitors');
const employees = require('./models/employees');
const url = 'mongodb://localhost:27017/ves';
const connect = mongoose.connect(url, {
    useMongoClient: true,
    /* other options */
  });

connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });

// mongo end code


var app = express();

/*app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    return next();
});
*/
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/leaders', leaderRouter);
app.use('/visitors',visitorRouter);
app.use('/employees',employeeRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
   console.log('unclaimed req route: %j', req.url)
   console.log('unclaimed req route methods: %j', req.method);
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log('unclaimed error found: %j', err);

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
