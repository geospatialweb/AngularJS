(function () {
'use strict';

var config = require('./config/config'),
    express = require('express'),
    favicon = require('serve-favicon'),
    join = require('path').join,
    app = express();

const HOST = config.node.host,
      PORT = config.node.port;

app.use(express.static(join(__dirname, 'src')));

app.use(favicon(join(__dirname, 'src/images/favicon.ico')));

app.use(config.routes.layers, require(join(__dirname, join('routes', config.routes.layers))));

app.listen(PORT, HOST, function (error)
{
    if (error)
        console.error(error);

    else
        console.log('Active on http://localhost:' + PORT + ' at ' + new Date().toDateString() + ' ' + new Date().toTimeString());
});

return true;
})();
