var express = require('express'),
    favicon = require('serve-favicon'),
    join = require('path').join,
    port = 80,
    app = express();

app.use(favicon(join(__dirname, 'public/images/favicon.ico')));
app.use(express.static(join(__dirname, 'public')));

app.use('/google',
    require('./routes/google'));
app.use('/mapbox',
    require('./routes/mapbox'));
app.use('/office',
    require('./routes/kml').office);
app.use('/placename',
    require('./routes/kml').placename);
app.use('/trail',
    require('./routes/kml').trail);

app.listen(port);
console.log('Server is listening at http://127.0.0.1:' + port +'\n');
