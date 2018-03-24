(function () {
'use strict';

var express = require('express'),
	config = require('../config/config'),
	geojson = require('../modules/geojson'),
	parse = require('pg-connection-string').parse,
	pg = require('pg');

var layer = express.Router().get('/', function (req, res) {
	/* docker container postgres */
	var connection = parse(config.postgres.DATABASE_URL);

	/* local postgres */
	//var connection = parse(config.postgres.DATABASE_URL_LOCAL);

	pg.connect(connection, function (err, client, release) {
		var sql = 'SELECT ' + req.query.fields + ' FROM ' + req.query.table;

		if (err) {
			console.error(err);
			res.status(500).send(err);
		}

		else
			client.query(sql, function (err, result) {
				release();

				if (err) {
					console.error(err);
					res.status(500).send(err);

				} else if (result.rowCount > 0)
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
