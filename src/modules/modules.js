'use strict';

import angular from 'angular';

import {mapController} from './controllers/mapController';
import {layerController} from './controllers/layerController';
import {trailController} from './controllers/trailController';

import {mapLayerDirective} from './directives/mapLayerDirective';
import {mapTrailDirective} from './directives/mapTrailDirective';
import {splashScreenDirective} from './directives/splashScreenDirective';

import {mapService} from './services/mapService';
import {markerService} from './services/markerService';
import {displayMarkerService} from './services/displayMarkerService';
import {splashScreenService} from './services/splashScreenService';

angular.module('app', [])
	.controller('mapController', mapController)
	.controller('layerController', layerController)
	.controller('trailController', trailController)

	.directive('mapLayer', mapLayerDirective)
	.directive('mapTrail', mapTrailDirective)
	.directive('splashScreen', splashScreenDirective)

	.service('mapService', mapService)
	.service('markerService', markerService)
	.service('displayMarkerService', displayMarkerService)
	.service('splashScreenService', splashScreenService)
;
