var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
var MongoClient = require('mongodb').MongoClient,
	assert = require('assert');

// Connection URL
var url = 'mongodb://' + process.env.MONGO_HOST + '/api';
var db;
// Use connect method to connect to the server
MongoClient.connect(url, function (err, dbConn) {
	assert.equal(null, err);
	console.log("Connected successfully to server");

	db = dbConn;
	app.set('db', db);
});
/// catch 404 and forwarding to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next();
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function (err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

module.exports = app;
