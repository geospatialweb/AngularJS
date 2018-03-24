(function () {
'use strict';

function layerDirective($sce) {
	var ddo = {
		restrict: 'E',
		templateUrl: $sce.trustAsResourceUrl('partials/mapLayers.html'),
		controller: 'layerController as layer'
	};

	return ddo;
}

layerDirective.$inject = ['$sce'];

module.exports = layerDirective;

return true;
})();
