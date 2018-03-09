(function () {
'use strict';

function mapTrails($sce, mapService) {
	var ddo = {
		restrict: 'E',
		templateUrl: $sce.trustAsResourceUrl('partials/mapTrails.html'),
		controller: 'mapTrailsController as trails'
	};

	return ddo;
}

app.directive('mapTrails', mapTrails);
mapTrails.$inject = ['$sce', 'mapService'];

return true;
})();
