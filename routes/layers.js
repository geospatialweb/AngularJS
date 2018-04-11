'use strict';

const express = require('express');
const geojson = require('../modules/geojson');
const pg = require('pg');

module.exports = express.Router().get('/', (req, res) =>
{
	/* local postgres instance:
		process.env.DATABASE_URL_LOCAL;
	*/
	pg.connect(process.env.DATABASE_URL, (error, client, release) =>
	{
		const sql = `SELECT ${req.query.fields} FROM ${req.query.table}`;

		if (error)
		{
			console.error(error);
			res.status(500).send(error);
		
		} else
			client.query(sql, (error, result) =>
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
