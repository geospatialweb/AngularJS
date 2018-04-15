'use strict';

export default class SplashScreenDirective
{
	constructor()
	{
		this.restrict = 'E';
		this.templateUrl = 'partials/splashScreen.html';
		this.controller = 'SplashScreenController as splashScreen';
	}

	link(scope, element)
	{
        scope.splashScreen.splashScreenService.setSplashScreen(element.children());
        return true;
    }
}
