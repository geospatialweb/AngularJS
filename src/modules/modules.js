'use strict';

import angular from 'angular';

import LayerController from './controllers/LayerController';
import TrailController from './controllers/TrailController';
import SplashScreenController from './controllers/SplashScreenController';

import MapLayerDirective from './directives/MapLayerDirective';
import MapTrailDirective from './directives/MapTrailDirective';
import SplashScreenDirective from './directives/SplashScreenDirective';

import MapService from './services/MapService';
import MarkerService from './services/MarkerService';
import DisplayMarkerService from './services/DisplayMarkerService';
import SplashScreenService from './services/SplashScreenService';

angular.module('app', [])
	.controller('LayerController', LayerController)
	.controller('TrailController', TrailController)
	.controller('SplashScreenController', SplashScreenController)

	.directive('mapLayer', () => new MapLayerDirective)
	.directive('mapTrail', () => new MapTrailDirective)
	.directive('splashScreen', () => new SplashScreenDirective)

	.service('mapService', MapService)
	.service('markerService', MarkerService)
	.service('displayMarkerService', DisplayMarkerService)
	.service('splashScreenService', SplashScreenService)
;
