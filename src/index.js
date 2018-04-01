(function () {
'use strict';

var app = require('angular').module('app', []);

app.service('mapService', require('./modules/services/mapService'));
app.service('markerService', require('./modules/services/markerService'));
app.service('displayMarkerService', require('./modules/services/displayMarkerService'));
app.service('splashScreenService', require('./modules/services/splashScreenService'));

app.controller('mapController', require('./modules/controllers/mapController'));
app.controller('layerController', require('./modules/controllers/layerController'));
app.controller('trailController', require('./modules/controllers/trailController'));

app.directive('mapboxGl', require('./modules/directives/mapboxGlDirective'));
app.directive('mapLayer', require('./modules/directives/mapLayerDirective'));
app.directive('mapTrail', require('./modules/directives/mapTrailDirective'));
app.directive('splashScreen', require('./modules/directives/splashScreenDirective'));

return true;
})();
