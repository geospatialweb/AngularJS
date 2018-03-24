(function () {
'use strict';

function trailDirective($sce) {
	var ddo = {
		restrict: 'E',
		templateUrl: $sce.trustAsResourceUrl('partials/mapTrails.html'),
		controller: 'trailController as trails'
	};

	return ddo;
}

trailDirective.$inject = ['$sce'];

module.exports = trailDirective;

return true;
})();
