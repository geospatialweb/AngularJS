var express = require('express'),
	parse = require('pg-connection-string').parse,
	pg = require('pg');

pg.logError = function (error, res, sql) {
	console.log("ERROR!");
	console.log((error.stack || error) + '\n' + sql);
	return res.status(500).send({"Error": error});
};

module.exports = express.Router().get('/', function(req, res) {
	var connection = parse('postgres://postgres:admin@postgres/postgres');

	pg.connect(connection, function (error, client, release) {
		var sql = 'SELECT lat, lng FROM region';

		if (error)
			pg.logError(error, res, sql);
		else
			client.query(sql, function (error, result) {
				release();

				if (error)
					 pg.logError(error, res, sql);

				else if (result.rows[0] !== undefined) {
					var geojson = '{"type": "Feature", "properties": {}, "geometry": {"type": "Polygon", "coordinates": [[';

					for (var i = 0; i < result.rows.length; i++) {
						geojson += '[' + result.rows[i].lng + ',' + result.rows[i].lat + '],';
					}

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
