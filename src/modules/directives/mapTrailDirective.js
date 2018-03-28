(function () {
'use strict';

function mapTrailDirective($sce) {
	var ddo = {
		restrict: 'E',
		templateUrl: $sce.trustAsResourceUrl('partials/mapTrail.html'),
		controller: 'trailController as trails'
	};

	return ddo;
}

mapTrailDirective.$inject = ['$sce'];

module.exports = mapTrailDirective;

return true;
})();
