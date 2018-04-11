'use strict';

export function splashScreenService($document)
{
	const splashScreenService = this;

	splashScreenService.hideSplashScreen = () =>
	{
		splashScreenService.splashScreen.removeClass('visible');

		angular.element($document[0].querySelectorAll('map-layer ul.layers li.biosphere div'))
			.addClass('active');

		return true;
	};

	splashScreenService.setSplashScreen = element =>
		splashScreenService.splashScreen = element;

	splashScreenService.addSplashScreen = () =>
		splashScreenService.splashScreen.addClass('active');

	splashScreenService.removeSplashScreen = () =>
		splashScreenService.splashScreen.removeClass('active');

	return splashScreenService;
}
