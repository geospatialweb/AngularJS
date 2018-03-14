(function () {
'use strict';

function mapLayersDirective($sce, mapService) {
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

mapLayersDirective.$inject = ['$sce', 'mapService'];

module.exports = mapLayersDirective;

return true;
})();
