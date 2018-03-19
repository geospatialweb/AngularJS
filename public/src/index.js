(function () {
'use strict';

const app = require('angular').module('app', []);

app.service('mapService', require('C:/Users/John/Documents/devops/public/src/services/mapService'));
app.service('mapLayerService', require('C:/Users/John/Documents/devops/public/src/services/mapLayerService'));
app.service('mapMarkerService', require('C:/Users/John/Documents/devops/public/src/services/mapMarkerService'));

app.directive('mapLayers', require('C:/Users/John/Documents/devops/public/src/directives/mapLayersDirective'));
app.directive('mapTrails', require('C:/Users/John/Documents/devops/public/src/directives/mapTrailsDirective'));

app.controller('mapController', require('C:/Users/John/Documents/devops/public/src/controllers/mapController'));
app.controller('mapLayersController', require('C:/Users/John/Documents/devops/public/src/controllers/mapLayersController'));
app.controller('mapTrailsController', require('C:/Users/John/Documents/devops/public/src/controllers/mapTrailsController'));

return true;
})();
