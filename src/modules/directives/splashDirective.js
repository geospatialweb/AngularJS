(function () {
'use strict';

function splashDirective($sce, mapService) {
	var ddo = {
		restrict: 'E',
		templateUrl: $sce.trustAsResourceUrl('partials/splashScreen.html'),
		link: splashLink
	};

	function splashLink(scope, element) {
        mapService.splashScreen = element;
        return true;
    }

	return ddo;
}

splashDirective.$inject = ['$sce', 'mapService'];

module.exports = splashDirective;

return true;
})();
