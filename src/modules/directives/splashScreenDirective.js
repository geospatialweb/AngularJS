(function () {
'use strict';

function splashScreenDirective($sce, splashScreenService)
{
	var ddo = {
		restrict: 'E',
		templateUrl: $sce.trustAsResourceUrl('partials/splashScreen.html'),
		link: splashScreenLink
	};

	function splashScreenLink(scope, el)
	{
        splashScreenService.splashScreen = el.children();
        return true;
    }

	return ddo;
}

splashScreenDirective.$inject = ['$sce', 'splashScreenService'];

module.exports = splashScreenDirective;

return true;
})();
