(function () {
'use strict';

var express = require('express'),
	config = require('../config/config'),
	geojson = require('../modules/geojson'),
	parse = require('pg-connection-string').parse,
	pg = require('pg');

pg.logError = function (err, res) {
	console.error(err);
	res.status(500).send(err);
	return true;
};

var layer = express.Router().get('/', function (req, res) {
	//container database - delete Dockerfile in root directory after build
	var connection = parse(config.DATABASE_URL);

	//local database - copy /images/Dockerfile to root directory
	//var connection = parse(config.DATABASE_URL_LOCAL);

	pg.connect(connection, function (err, client, release) {
		var sql = 'SELECT ' + req.query.fields + ' FROM ' + req.query.table;

		if (err)
			pg.logError(err, res);

		else
			client.query(sql, function (err, result) {
				release();

				if (err)
					pg.logError(err, res);

				else if (result.rowCount > 0)
					res.status(200).send(geojson(result.rows));

				else
					console.error('No rows returned for:\n', sql);

				return true;
			});

		return true;
	});

	return true;
});

module.exports = layer;

return true;
})();
