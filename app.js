var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// cargo módulod e conección mongoose y los modelos (Anuncio y Usuario)
require('./lib/connect-mongoose');
require('./models/Anuncio');
require('./models/Usuario');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares de mi app
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// rutas de mi app
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/apiv0/anuncios', require('./routes/apiv0/anuncios'));
app.use('/apiv0/usuarios', require('./routes/apiv0/usuarios'));
app.use('/apiv0/initialize-db', require('./routes/apiv0/initialize-db'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found leñe');
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

module.exports = app;
