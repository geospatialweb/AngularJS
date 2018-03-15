(function () {
'use strict';

const app = require('angular').module('app', []);

app.controller('mapController', require('C:/Users/John/Documents/devops/public/src/controllers/mapController'));
app.controller('mapLayersController', require('C:/Users/John/Documents/devops/public/src/controllers/mapLayersController'));
app.controller('mapTrailsController', require('C:/Users/John/Documents/devops/public/src/controllers/mapTrailsController'));

app.directive('mapLayers', require('C:/Users/John/Documents/devops/public/src/directives/mapLayersDirective'));
app.directive('mapTrails', require('C:/Users/John/Documents/devops/public/src//directives/mapTrailsDirective'));

app.service('mapService', require('C:/Users/John/Documents/devops/public/src//services/mapService'));

return true;
})();
