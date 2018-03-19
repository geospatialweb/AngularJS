(function () {
'use strict';

function mapLayersDirective($sce, mapLayerService) {
	var ddo = {
		restrict: 'E',
		templateUrl: $sce.trustAsResourceUrl('partials/mapLayers.html'),
		controller: 'mapLayersController as layers',
		link: mapLayersLink
	};

	function mapLayersLink(scope, element) {
        mapLayerService.layers = element;
        return true;
    }

	return ddo;
}

mapLayersDirective.$inject = ['$sce', 'mapLayerService'];

module.exports = mapLayersDirective;

return true;
})();
