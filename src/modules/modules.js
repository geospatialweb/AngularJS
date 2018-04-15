'use strict';

import angular from 'angular';

import layerController from './controllers/layerController';
import trailController from './controllers/trailController';
import splashScreenController from './controllers/splashScreenController';

import mapLayerDirective from './directives/mapLayerDirective';
import mapTrailDirective from './directives/mapTrailDirective';
import splashScreenDirective from './directives/splashScreenDirective';

import mapService from './services/mapService';
import markerService from './services/markerService';
import displayMarkerService from './services/displayMarkerService';
import splashScreenService from './services/splashScreenService';

angular.module('app', [])
	.controller('LayerController', layerController)
	.controller('TrailController', trailController)
	.controller('SplashScreenController', splashScreenController)

	.directive('mapLayer', () => new mapLayerDirective)
	.directive('mapTrail', () => new mapTrailDirective)
	.directive('splashScreen', () => new splashScreenDirective)

	.service('mapService', mapService)
	.service('markerService', markerService)
	.service('displayMarkerService', displayMarkerService)
	.service('splashScreenService', splashScreenService)
;
