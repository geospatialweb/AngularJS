(function () {
'use strict';

var config = require('./config/config'),
    express = require('express'),
    favicon = require('serve-favicon'),
    fs = require('fs'),
    http = require('http'),
    join = require('path').join,
    morgan = require('morgan'),

    app = express();

const HOST = config.node.HOST,
      PORT = config.node.PORT;

http.createServer(
    app
        .use(morgan('combined', {
            stream: fs.createWriteStream(join(__dirname, config.logfile), {
                flags: 'a'
            })
        }))

        .use(express.static(join(__dirname, config.sourcecode)))

        .use(favicon(join(__dirname, config.favicon)))

        .use(config.routes.layers, require(join(__dirname, join('routes', config.routes.layers))))

        .set('timeout', config.timeout)

        .set('host', HOST)

        .set('port', PORT)
)
    .listen(PORT, HOST, function (error)
    {
        if (error)
            console.error(error);

        else
            console.log('Active on http://localhost:' + PORT + ' at ' + new Date().toDateString() + ' ' + new Date().toTimeString());
    });

return true;
})();
