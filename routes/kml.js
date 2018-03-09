(function () {
'use strict';

var express = require('express'),
    fs = require('fs'),
    geojson = require('@mapbox/togeojson'),
    jsdom = require('jsdom-nogyp').jsdom;

var office = express.Router().get('/', function (req, res) {
	return res.send(geojson.kml(jsdom(fs.readFileSync('./public/kml/office.kml', 'utf8'))));
});

var places = express.Router().get('/', function (req, res) {
    return res.send(geojson.kml(jsdom(fs.readFileSync('./public/kml/places.kml', 'utf8'))));
});

var trails = express.Router().get('/', function (req, res) {
    return res.send(geojson.kml(jsdom(fs.readFileSync('./public/kml/trails.kml', 'utf8'))));
});

module.exports.office = office;
module.exports.places = places;
module.exports.trails = trails;

return true;
})();
