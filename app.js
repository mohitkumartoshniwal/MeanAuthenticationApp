var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var localstrategy = require('passport-local').Strategy;
var multer = require('multer');
var upload = multer({destination:'./uploads'});
var passport = require('passport');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var mongodb = require('mongodb');
var mongoose = require('mongoose');


const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config/database');
const users = require('./routes/users');

//var db = mongoose.connection;



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// Connect To Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database '+config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
    console.log('Database error: '+err);
});


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'public')));

//handle session
app.use(session({
  secret:'secret',
  saveUninitialized:true,
  resave:true
}));

// passport
app.use(passport.initialize());
app.use(passport.session());

//require('./config/passport')(passport);


app.use('/users', users);

// Body Parser Middleware
app.use(bodyParser.json());

// CORS Middleware
app.use(cors());

//validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

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



require('./config/passport')(passport);


app.get('/',function (req,res) {
    res.send("Hello world");
});

app.listen(3000,function () {
    console.log("Listening on port 3000");
});