'use strict';

export function mapTrailDirective($sce)
{
	const ddo = {
		restrict: 'E',
		templateUrl: $sce.trustAsResourceUrl('partials/mapTrail.html'),
		controller: 'trailController as trails'
	};

	return ddo;
}

mapTrailDirective.$inject = ['$sce'];
