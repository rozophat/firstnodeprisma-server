var createError = require('http-errors');
const graphql = require("graphql");
var express = require('express');
var cors = require('cors');

//GraphQL Declaration
const expressGraphQl = require("express-graphql");
const { GraphQLSchema } = graphql;
const { query } = require("./schemas/queries");
const { mutation } = require("./schemas/mutations");

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let session = require('express-session');
let flash = require('connect-flash')

const schema = new GraphQLSchema({
  query,
  mutation
});

var app = express();

// allow cross-origin requests
app.use(cors());

app.use(
  '/graph',
  expressGraphQl({
    schema: schema,
    graphiql: true
  })
);

// view engine setup
app.use(flash())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: 'our new secret'}));

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
