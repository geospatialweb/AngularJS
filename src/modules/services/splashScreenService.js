(function () {
'use strict';

function splashScreenService() {
	var splashScreenService = this;

	splashScreenService.splashScreen = null;

	splashScreenService.hideSplashScreen = function () {
		splashScreenService.splashScreen.removeClass('visible');
		return true;
	};

	return splashScreenService;
}

module.exports = splashScreenService;

return true;
})();
