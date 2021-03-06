var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//MongoDB
var mongoose = require('mongoose');
var passport = require('passport');
//Connect to MongoDB local
//mongoose.connect('mongodb://localhost/news');
//var db = Mongoose.createConnection('mongodb://USER:PASSWORD@localhost/DATABASE');
//Connect to MongoDB Amazon web service
//mongoose.connect('mongodb://root:5ONhmK3f1pVK@/opt/bitnami/mongodb/tmp/mongodb-27017.sock/admin');
//Connect to MongoDB Heroku
//mongoose.connect('mongodb://root:andromeda@ds029117.mongolab.com:29117/heroku_lq232rp3');
//Connect to openshift Heroku
mongoose.connect('mongodb://admin:2aLbGjebuJ7Xr@ds029117.mongolab.com:29117/meanstack');
require('./model/Post');
require('./model/Comment');
require('./model/User');
require('./config/passport');

var routes = require('./routes/index');
var users = require('./routes/users');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'src')));

//Initiating passport
app.use(passport.initialize());

app.use('/', routes);
app.use('/users', users);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
