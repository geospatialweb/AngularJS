var express = require('express');
var sql = require('mssql');

var config = {
	server		: 'localhost\\SQLEXPRESS',
	database	: 'fabr',
	user		: 'sa',
	password	: 'Na1r0b10'
};

module.exports = express.Router().get('/', function(request, response) {
	var connection = new sql.Connection(config, function(error) {
		if (error)
			throw error;

		else {
			var request = new sql.Request(connection),
				select = 'select lng, lat from region';

			request.query(select, function(error, result) {
				if (error)
					throw error;

				else {
                    var geojson = '{"type": "Feature", "properties": {}, "geometry": {"type": "Polygon", "coordinates": [[';

					for (var i = 0; i < result.length; i++) {
						geojson += '[' + result[i].lng + ',' + result[i].lat + '],';
					}

					response.send(geojson.substr(0, geojson.length - 1) + ']]}}');
				}

				return true;
			});
		}

		return connection.close();
	});

	return true;
});
