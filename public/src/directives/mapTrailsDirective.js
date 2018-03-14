(function () {
'use strict';

function mapTrailsDirective($sce, mapService) {
	var ddo = {
		restrict: 'E',
		templateUrl: $sce.trustAsResourceUrl('partials/mapTrails.html'),
		controller: 'mapTrailsController as trails'
	};

	return ddo;
}

mapTrailsDirective.$inject = ['$sce', 'mapService'];

module.exports = mapTrailsDirective;

return true;
})();
