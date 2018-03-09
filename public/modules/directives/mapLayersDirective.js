(function () {
'use strict';

function mapLayers($sce, mapService) {
	var ddo = {
		restrict: 'E',
		templateUrl: $sce.trustAsResourceUrl('partials/mapLayers.html'),
		controller: 'mapLayersController as layers',
		link: mapLayersLink
	};

	function mapLayersLink(scope, element) {
        mapService.mapLayers = element;
        return true;
    }

	return ddo;
}

app.directive('mapLayers', mapLayers);
mapLayers.$inject = ['$sce', 'mapService'];

return true;
})();
