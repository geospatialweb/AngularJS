'use strict';

export default class SplashScreenController
{
	constructor(splashScreenService)
	{
		this.splashScreenService = splashScreenService;
	}
}

SplashScreenController.$inject = ['splashScreenService'];
