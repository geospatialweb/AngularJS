(function () {
'use strict';

function splashScreenService($document)
{
	var splashScreenService = this;

	splashScreenService.splashScreen = null;

	splashScreenService.hideSplashScreen = function ()
	{
		splashScreenService.splashScreen.removeClass('visible');

		angular.element($document[0].querySelectorAll('map-layer ul.layers li.biosphere div'))
			.addClass('active');

		return true;
	};

	return splashScreenService;
}

splashScreenService.$inject = ['$document'];

module.exports = splashScreenService;

return true;
})();
