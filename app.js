(function () {
'use strict';

const express = require('express'),
      config = require('./config/config'),
      favicon = require('serve-favicon'),
      join = require('path').join,
      host = config.host,
      port = config.port,
      app = express();

app.use(favicon(join(__dirname, 'public/images/favicon.ico')));

app.use(express.static(join(__dirname, 'public')));

app.use('/layers', require(join(__dirname, 'routes/layers')));

app.listen(port, host, function (err) {
    if (err)
        console.error(err);
    else
        console.log('Active on http://localhost:' + port + ' at ' + new Date().toDateString() + ' ' + new Date().toTimeString());
});

return true;
})();
