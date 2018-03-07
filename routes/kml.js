(function () {
'use strict';

var express = require('express'),
    fs = require('fs'),
    gj = require('@mapbox/togeojson'),
    jsdom = require('jsdom-nogyp').jsdom;

exports.office = express.Router().get('/', function(req, res) {
	return res.send(gj.kml(jsdom(fs.readFileSync('./public/kml/office.kml', 'utf8'))));
});

exports.places = express.Router().get('/', function(req, res) {
    return res.send(gj.kml(jsdom(fs.readFileSync('./public/kml/places.kml', 'utf8'))));
});

exports.trails = express.Router().get('/', function(req, res) {
    return res.send(gj.kml(jsdom(fs.readFileSync('./public/kml/trails.kml', 'utf8'))));
});

return true;
})();
