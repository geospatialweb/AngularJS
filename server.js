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
        .use(morgan(config.morgan.format, {
            stream: fs.createWriteStream(join(__dirname, config.morgan.logfile), {
                flags: config.morgan.flags
            })
        }))

        .use(express.static(join(__dirname, config.sourcecode)))

        .use(favicon(join(__dirname, join(config.sourcecode, config.favicon))))

        .use(config.routes.layers, require(join(__dirname, join(config.routes.directory, config.routes.layers))))

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
