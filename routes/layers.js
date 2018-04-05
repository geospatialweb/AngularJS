(function () {
'use strict';

var express = require('express'),
	geojson = require('../modules/geojson'),
	pg = require('pg'),

	router = express.Router();

var layer = router.get('/', function (req, res)
{
	/* local postgres instance 
		change: process.env.DATABASE_URL_LOCAL;
	*/
	pg.connect(process.env.DATABASE_URL, function (error, client, release)
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
