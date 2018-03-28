(function () {
'use strict';

var express = require('express'),
    config = require('./config/config'),
    favicon = require('serve-favicon'),
    join = require('path').join,
    host = config.node.host,
    port = config.node.port,
    app = express();

app.use(express.static(join(__dirname, 'src')));

app.use(favicon(join(__dirname, 'src/images/favicon.ico')));

app.use('/layers', require(join(__dirname, 'routes/layers')));

app.listen(port, host, function (error) {
    if (error)
        console.error(error);
    else
        console.log('Active on http://localhost:' + port + ' at ' + new Date().toDateString() + ' ' + new Date().toTimeString());
});

return true;
})();
