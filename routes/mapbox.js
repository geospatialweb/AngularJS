(function () {
'use strict';

var express = require('express'),
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

				else if (result.rows[0] !== undefined) {
					var geojson = '{"type": "Feature", "properties": {}, "geometry": {"type": "Polygon", "coordinates": [[';

					result.rows.forEach(function (row) {
						geojson += '[' + row.lng + ',' + row.lat + '],';
					});

					res.status(200).send(geojson.substr(0, geojson.length - 1) + ']]}}');
				}

				else {
					console.log('No rows received for: \n' + sql);
					res.status(200).send([]);
				}

				return true;
			});

		return true;
	});

	return true;
});

return true;
})();
