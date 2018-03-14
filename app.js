(function () {
'use strict';

const express = require('express'),
      favicon = require('serve-favicon'),
      path = require('path'),
      app = express(),
      HOST = '0.0.0.0',
      PORT = 80;

app.use(favicon(path.resolve(__dirname, 'public/images/favicon.ico')));
app.use(express.static(path.resolve(__dirname, 'public')));

app.use('/region', require('./routes/region'));
app.use('/office', require('./routes/kml').office);
app.use('/places', require('./routes/kml').places);
app.use('/trails', require('./routes/kml').trails);

app.listen(PORT, HOST);
console.log('Running on http://' + HOST + ':' + PORT +'\n');

return true;
})();
