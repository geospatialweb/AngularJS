(function () {
'use strict';

function splashScreenService($document)
{
	var splashScreenService = this;

	splashScreenService.setSplashScreen = function (element)
	{
		splashScreenService.splashScreen = element;
		return true;
	};

	splashScreenService.hideSplashScreen = function ()
	{
		splashScreenService.splashScreen.removeClass('visible');

		angular.element($document[0].querySelectorAll('map-layer ul.layers li.biosphere div'))
			.addClass('active');

		return true;
	};

	splashScreenService.addSplashScreen = function ()
	{
		splashScreenService.splashScreen.addClass('active');
		return true;
	};

	splashScreenService.removeSplashScreen = function ()
	{
		splashScreenService.splashScreen.removeClass('active');
		return true;
	};

	return splashScreenService;
}

splashScreenService.$inject = ['$document'];

module.exports = splashScreenService;

return true;
})();
