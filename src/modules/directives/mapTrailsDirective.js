(function () {
'use strict';

function mapTrailsDirective($sce) {
	var ddo = {
		restrict: 'E',
		templateUrl: $sce.trustAsResourceUrl('partials/mapTrails.html'),
		controller: 'mapTrailsController as trails'
	};

	return ddo;
}

mapTrailsDirective.$inject = ['$sce'];

module.exports = mapTrailsDirective;

return true;
})();
