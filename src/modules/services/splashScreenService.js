'use strict';

export default class splashScreenService
{
	constructor($document)
	{
		this.$document = $document;
		this.splashScreen = undefined;
	}

	setSplashScreen(element)
	{
		this.splashScreen = element;
		return true;
	}

	addSplashScreen()
	{
		this.splashScreen.addClass('visible');
		return true;
	}

	removeSplashScreen()
	{
		this.splashScreen.removeClass('visible');
		return true;
	}

	hideSplashScreen()
	{
		this.splashScreen.removeClass('active');
		angular.element(this.$document[0].querySelectorAll('map-layer ul.layers li.biosphere div')).addClass('active');
		return true;
	}
}

splashScreenService.$inject = ['$document'];
