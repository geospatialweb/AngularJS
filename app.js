(function () {
'use strict';

const express = require('express'),
      favicon = require('serve-favicon'),
      path = require('path'),
      app = express(),
      host = '0.0.0.0',
      port = 80;

app.use(favicon(path.resolve(__dirname, 'public/images/favicon.ico')));
app.use(express.static(path.resolve(__dirname, 'public')));

app.use('/region', require(path.resolve(__dirname, 'routes/region')));
app.use('/office', require((path.resolve(__dirname, 'routes/kml'))).office);
app.use('/places', require((path.resolve(__dirname, 'routes/kml'))).places);
app.use('/trails', require((path.resolve(__dirname, 'routes/kml'))).trails);

app.listen(port, host);
console.log('Running on http://' + host + ':' + port +'\n');

return true;
})();
