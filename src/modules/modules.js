(function () {
'use strict';

var app = require('angular').module('app', []);

app.controller('mapController', require('./controllers/mapController'));
app.controller('layerController', require('./controllers/layerController'));
app.controller('trailController', require('./controllers/trailController'));

app.directive('mapLayer', require('./directives/mapLayerDirective'));
app.directive('mapTrail', require('./directives/mapTrailDirective'));
app.directive('splashScreen', require('./directives/splashScreenDirective'));

app.service('mapService', require('./services/mapService'));
app.service('markerService', require('./services/markerService'));
app.service('displayMarkerService', require('./services/displayMarkerService'));
app.service('splashScreenService', require('./services/splashScreenService'));

module.exports = app;

return true;
})();
