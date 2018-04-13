'use strict';

export default class splashScreenDirective
{
	constructor()
	{
		this.restrict = 'E';
		this.templateUrl = 'partials/splashScreen.html';
		this.controller = 'splashScreenController as splash';
	}

	link(scope, element)
	{
        scope.splash.splashScreenService.setSplashScreen(element.children());
        return true;
    }
}
