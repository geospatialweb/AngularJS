var express = require('express'),
    favicon = require('serve-favicon'),
    join = require('path').join,
    host = '0.0.0.0',
    port = 8080,
    app = express();

app.use(favicon(join(__dirname, 'public/images/favicon.ico')));
app.use(express.static(join(__dirname, 'public')));

app.use('/mapbox',
    require('./routes/mapbox'));
app.use('/office',
    require('./routes/kml').office);
app.use('/placename',
    require('./routes/kml').placename);
app.use('/trail',
    require('./routes/kml').trail);

app.listen(port, host);
console.log('Running on http://' + host + ':' + port +'\n');
