const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const stylus = require('stylus');
const passport = require('passport');
const expressSession = require("express-session");

require('dotenv').config();
require('./db');

const indexRouter = require('./routes/index');
const plattformRouter = require('./routes/plattform');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(stylus.middleware(path.join(__dirname, 'public')));
app.use(expressSession({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

require('./auth');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/lib/font-awesome', express.static(path.join(__dirname, 'node_modules', 'font-awesome')));
app.use('/lib/bootstrap', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist')));
app.use('/lib/jquery', express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist')));
app.use('/lib/jquery-easing', express.static(path.join(__dirname, 'node_modules', 'jquery-easing', 'dist')));

app.use('/', indexRouter);
app.use('/plattform', isLoggedIn, plattformRouter);

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
  res.render('error', { loggedIn: req.isAuthenticated() });
});

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/anmelden");
}

module.exports = app;
