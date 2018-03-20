(function () {
'use strict';

function mapLayersDirective($sce) {
	var ddo = {
		restrict: 'E',
		templateUrl: $sce.trustAsResourceUrl('partials/mapLayers.html'),
		controller: 'mapLayersController as layers'
	};

	return ddo;
}

mapLayersDirective.$inject = ['$sce'];

module.exports = mapLayersDirective;

return true;
})();
