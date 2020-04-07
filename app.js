var createError = require('http-errors');
const graphql = require("graphql");
var express = require('express');

//GraphQL Declaration
const expressGraphQl = require("express-graphql");
const { GraphQLSchema } = graphql;
const { query } = require("./schemas/queries");
const { mutation } = require("./schemas/mutations");

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let passport = require('passport');
let session = require('express-session');
var indexRouter = require('./routes/index');
var landingRouter = require('./routes/landing');
var usersRouter = require('./routes/users');
let flash = require('connect-flash')
require('./passport_setup')(passport);

const schema = new GraphQLSchema({
  query,
  mutation
});

var app = express();

app.use(
  '/graph',
  expressGraphQl({
    schema: schema,
    graphiql: true
  })
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(flash())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: 'our new secret'}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/landing', landingRouter);
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

module.exports = app;
