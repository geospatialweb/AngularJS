var express = require('express'),
    fs = require('fs'),
    jsdom = require('jsdom-nogyp').jsdom,
    tj = require('@mapbox/togeojson');

exports.office = express.Router().get('/', function(request, response) {
	response.send(tj.kml(jsdom(fs.readFileSync('./public/kml/office.kml', 'utf8'))));
    return true;
});

exports.placename = express.Router().get('/', function(request, response) {
    response.send(tj.kml(jsdom(fs.readFileSync('./public/kml/placename.kml', 'utf8'))));
    return true;
});

exports.trail = express.Router().get('/', function(request, response) {
    response.send(tj.kml(jsdom(fs.readFileSync('./public/kml/trail.kml', 'utf8'))));
    return true;
});
