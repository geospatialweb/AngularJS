(function () {
'use strict';

var express = require('express'),
	geoJSON = require('../modules/geoJSON'),
	parse = require('pg-connection-string').parse,
	pg = require('pg');

pg.logError = function (err, res, sql) {
	console.log("ERROR!");
	console.log((err.stack || err) + '\n' + sql);
	return res.status(500).send({"Error": err});
};

module.exports = express.Router().get('/', function(req, res) {
	//container database - delete Dockerfile in root
	var connection = parse('postgres://postgres:admin@postgres/postgres');

	//local database - copy /images/Dockerfile to root
	//var connection = parse('postgres://postgres:admin@localhost/fabr');

	pg.connect(connection, function (error, client, release) {
		var sql = 'SELECT lat, lng FROM region';

		if (error)
			pg.logError(error, res, sql);

		else
			client.query(sql, function (err, result) {
				release();

				if (err)
					pg.logError(err, res, sql);

				else if (result.rowCount > 0)
					res.status(200).send(JSON.stringify(geoJSON(result.rows)));

				else
					console.log('No rows received for: \n' + sql);

				return true;
			});

		return true;
	});

	return true;
});

return true;
})();
