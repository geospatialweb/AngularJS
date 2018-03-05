(function () {
'use strict';

var express = require('express'),
    fs = require('fs'),
    gj = require('@mapbox/togeojson'),
    jsdom = require('jsdom-nogyp').jsdom;

exports.office = express.Router().get('/', function(req, res) {
	return res.send(gj.kml(jsdom(fs.readFileSync('./public/kml/office.kml', 'utf8'))));
});

exports.placename = express.Router().get('/', function(req, res) {
    return res.send(gj.kml(jsdom(fs.readFileSync('./public/kml/placename.kml', 'utf8'))));
});

exports.trail = express.Router().get('/', function(req, res) {
    return res.send(gj.kml(jsdom(fs.readFileSync('./public/kml/trail.kml', 'utf8'))));
});

return true;
})();
