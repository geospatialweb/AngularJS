(function () {
'use strict';

require('dotenv').config();

var config = require('./config/config'),
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
            stream: fs.createWriteStream(resolve(config.morgan.logfile), {
                flags: config.morgan.flags
            })
        }))

        .use(express.static(resolve(config.src)))

        .use(favicon(resolve(config.src, config.favicon)))

        .use(config.routes.layers, require(resolve(config.routes.directory, config.routes.layers.slice(1))))

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
