var express = require('express');
var ejs = require('ejs');
var fs = require('fs');
var app = express();

// load continents data from JSON file
var data = JSON.parse(fs.readFileSync(__dirname + '/data/continents.json', 'utf8'));

// Home page
app.get('/', function (request, response) {
	response.render(__dirname + '/templates/home.html');
})

// 'About the Visualization' page
app.get('/about', function (request, response) {
	response.render(__dirname + '/templates/aboutViz.html');
})

// Main viz page
app.get('/viz', function (request, response) {
	response.render(__dirname + '/templates/viz.html', { europe_countries: data["Europe"] });
})

// Run server here
var server = app.listen(process.env.PORT || 1337, function () {
	console.log("Server is running on localhost:%s", server.address().port)
	app.engine('html', ejs.renderFile);
	app.set('view engine', 'html');
	app.use(express.static(__dirname + '/data'));
	app.use(express.static(__dirname + '/data/Quantity'));
})
