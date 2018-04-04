(function () {
'use strict';

var config = require('./config/config'),
    dotenv = require('dotenv').config(),
    express = require('express'),
    favicon = require('serve-favicon'),
    fs = require('fs'),
    http = require('http'),
    morgan = require('morgan'),
    resolve = require('path').resolve,

    app = express();

const HOST = config.node.HOST,
      PORT = config.node.PORT;

http.createServer(
    app
        .use(morgan(config.morgan.format, {
            stream: fs.createWriteStream(resolve(process.cwd(), config.morgan.logfile), {
                flags: config.morgan.flags
            })
        }))

        .use(express.static(resolve(process.cwd(), config.sourcecode)))

        .use(favicon(resolve(process.cwd(), config.sourcecode, config.favicon)))

        .use(config.routes.layers, require(resolve(process.cwd(), config.routes.directory, config.routes.layers.slice(1))))

        .set('timeout', config.node.timeout)

        .set('host', HOST)

        .set('port', PORT)
)
    .listen(PORT, HOST, function (error)
    {
        if (error)
            console.error(error);

        else
            console.log('Active on http://' + config.node.localhost + ':' + PORT + 
                ' at ' + new Date().toDateString() + ' ' + new Date().toTimeString());
    });

return true;
})();
