(function () {
'use strict';

function mapLayerDirective($sce)
{
	var ddo = {
		restrict: 'E',
		templateUrl: $sce.trustAsResourceUrl('partials/mapLayer.html'),
		controller: 'layerController as layers'
	};

	return ddo;
}

mapLayerDirective.$inject = ['$sce'];

module.exports = mapLayerDirective;

return true;
})();
