var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
bodyParser = require('body-parser');
var session = require('express-session');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

//Mongoose connection - Anirudh
//Path - "C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe"
mongoose.connect('mongodb://127.0.0.1:27017/mydatabase');

// view engine setup
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//For cookies & sessions
//app.use(cookieParser());
//app.use(session({secret: '1234567890QWERTY'}));
app.use(session({
    secret: '1234567890QWERTY',
    resave: true,
    saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'public')));

//Anirudh - include common routing file index.js
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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



//Mongoose connection - Anirudh
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected...');
});

// define models - Anirudh

var todoSchema = mongoose.Schema({
    name: String,
    createdOn : Date
});

//Do not use 'var' keyword before Todo to make it globally accessible
Todo = mongoose.model('Todo',todoSchema);


var usersSchema = mongoose.Schema({
    name: String,
    mobile: String,
    createdOn : Date
});


Users = mongoose.model('User',usersSchema);


var chatSchema = mongoose.Schema({
    sender: String,
    reciever: String,
    message: String,
    createdOn : Date
});


Chat = mongoose.model('Chat',chatSchema);

module.exports = app;
