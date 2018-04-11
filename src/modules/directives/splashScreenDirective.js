'use strict';

splashScreenDirective.$inject = ['$sce', 'splashScreenService'];

export function splashScreenDirective($sce, splashScreenService)
{
	const ddo = {
		restrict: 'E',
		templateUrl: $sce.trustAsResourceUrl('partials/splashScreen.html'),
		link: splashScreenLink
	};

	function splashScreenLink(scope, element)
	{
        splashScreenService.setSplashScreen(element.children());
        return true;
    }

	return ddo;
}
