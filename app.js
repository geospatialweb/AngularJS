(function () {
'use strict';

const express = require('express'),
      favicon = require('serve-favicon'),
      join = require('path').join,
      app = express(),
      host = '0.0.0.0',
      port = 80;

app.use(favicon(join(__dirname, 'public/images/favicon.ico')));
app.use(express.static(join(__dirname, 'public')));

app.use('/layers', require(join(__dirname, 'routes/layers')));

app.listen(port, host, function (error) {
    if (error)
        console.log(error);
    else
        console.log('Active on http://localhost:' + port + ' at ' + new Date().toDateString() + ' ' + new Date().toTimeString());
});

return true;
})();
