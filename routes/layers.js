(function () {
'use strict';

var express = require('express'),
	geojson = require('../modules/geojson'),
	parse = require('pg-connection-string').parse,
	pg = require('pg');

pg.logError = function (err, res, sql) {
	console.log((err.stack || err) + '\n' + sql);
	return res.status(500).send({'Error': err});
};

var layer = express.Router().get('/', function (req, res) {
	//container database - delete Dockerfile in root directory after build
	var connection = parse('postgres://postgres:postgres@postgres/postgres');

	//local database - copy /images/Dockerfile to root directory
	//var connection = parse('postgres://postgres:admin@localhost/postgres');

	pg.connect(connection, function (error, client, release) {
		var sql;

		if (req.query.db_table === 'trails')
			sql = 'SELECT name, description, lng, lat, ST_AsGeoJSON(geom) FROM ' + req.query.db_table;

		else
			sql = 'SELECT name, description, ST_AsGeoJSON(geom) FROM ' + req.query.db_table;

		if (error)
			pg.logError(error, res, sql);

		else
			client.query(sql, function (err, result) {
				release();

				if (err)
					pg.logError(err, res, sql);

				else if (result.rowCount > 0)
					res.status(200).send(geojson(result.rows));

				else
					console.log('No rows received for: \n' + sql);

				return true;
			});

		return true;
	});

	return true;
});

module.exports = layer;

return true;
})();
