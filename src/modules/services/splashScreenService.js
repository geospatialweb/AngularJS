'use strict';

export function splashScreenService($document)
{
	const splashScreenService = this;

	splashScreenService.setSplashScreen = element =>
		splashScreenService.splashScreen = element;

	splashScreenService.addSplashScreen = () =>
		splashScreenService.splashScreen.addClass('visible');

	splashScreenService.removeSplashScreen = () =>
		splashScreenService.splashScreen.removeClass('visible');

	splashScreenService.hideSplashScreen = () =>
	{
		splashScreenService.splashScreen.removeClass('active');

		angular.element($document[0].querySelectorAll('map-layer ul.layers li.biosphere div')).addClass('active');

		return true;
	};

	return splashScreenService;
}

splashScreenService.$inject = ['$document'];