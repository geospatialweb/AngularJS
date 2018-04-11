'use strict';

mapLayerDirective.$inject = ['$sce'];

export function mapLayerDirective($sce)
{
	const ddo = {
		restrict: 'E',
		templateUrl: $sce.trustAsResourceUrl('partials/mapLayer.html'),
		controller: 'layerController as layers'
	};

	return ddo;
}
