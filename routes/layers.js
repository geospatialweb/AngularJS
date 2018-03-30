(function () {
'use strict';

var express = require('express'),
	config = require('../config/config'),
	geojson = require('../modules/geojson'),
	parse = require('pg-connection-string').parse,
	//pg = require('pg');

var layer = express.Router().get('/', function (req, res)
{
	var connection = parse(config.postgres.DATABASE_URL);

	pg.connect(connection, function (error, client, release)
	{
		var sql = 'SELECT ' + req.query.fields + ' FROM ' + req.query.table;

		if (error)
		{
			console.error(error);
			res.status(500).send(error);
		
		} else
			client.query(sql, function (error, result)
			{
				release();

				if (error)
				{
					console.error(error);
					res.status(500).send(error);

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
