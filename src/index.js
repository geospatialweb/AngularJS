(function () {
'use strict';

window.config = require('./config/config');

var app = require('angular').module('app', []);

app.service('mapService', require('./modules/services/mapService'));
app.service('layerService', require('./modules/services/layerService'));
app.service('markerService', require('./modules/services/markerService'));
app.service('displayService', require('./modules/services/displayService'));

app.controller('mapController', require('./modules/controllers/mapController'));
app.controller('layerController', require('./modules/controllers/layerController'));
app.controller('trailController', require('./modules/controllers/trailController'));

app.directive('mapLayers', require('./modules/directives/layerDirective'));
app.directive('mapTrails', require('./modules/directives/trailDirective'));

return true;
})();
