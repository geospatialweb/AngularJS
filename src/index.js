(function () {
'use strict';

window.config = require('./config/config');

var app = require('angular').module('app', []);

app.service('mapService', require('./modules/services/mapService'));
app.service('mapLayerService', require('./modules/services/mapLayerService'));
app.service('mapMarkerService', require('./modules/services/mapMarkerService'));

app.controller('mapController', require('./modules/controllers/mapController'));
app.controller('mapLayersController', require('./modules/controllers/mapLayersController'));
app.controller('mapTrailsController', require('./modules/controllers/mapTrailsController'));

app.directive('mapLayers', require('./modules/directives/mapLayersDirective'));
app.directive('mapTrails', require('./modules/directives/mapTrailsDirective'));

return true;
})();
