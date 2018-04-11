'use strict';

export function mapLayerDirective($sce)
{
	const ddo = {
		restrict: 'E',
		templateUrl: $sce.trustAsResourceUrl('partials/mapLayer.html'),
		controller: 'layerController as layers'
	};

	return ddo;
}
