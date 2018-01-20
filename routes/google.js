var express = require('express'),
    pg = require('pg');

pg.logError = function (error, res, sql) {
    console.log("ERROR!");
    console.log((error.stack || error) + '\n' + sql);
    res.status(500).send({"Error": error});
    return true;
};

module.exports = express.Router().get('/', function(req, res) {
    var connection = 'postgres://postgres:Serengett1@localhost/fabr';

    pg.connect(connection, function (error, client, release) {
        var sql = 'SELECT lat, lng FROM region';

        if (error)
            pg.logError(error, res, sql);
        else
            client.query(sql, function (error, result) {
                release();

                if (error)
                    pg.logError(error, res, sql);

                else if (result.rows[0] !== undefined)
                    res.status(200).send(result.rows);

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
