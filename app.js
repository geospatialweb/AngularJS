var express = require('express'),
    favicon = require('serve-favicon'),
    join = require('path').join,
    app = express();

const HOST = '0.0.0.0',
      PORT = 80;

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

app.listen(PORT, HOST);
console.log('Running on http://' + HOST + ':' + PORT +'\n');
