'use strict';

export default class splashScreenController
{
	constructor(splashScreenService)
	{
		this.splashScreenService = splashScreenService;
	}
}

splashScreenController.$inject = ['splashScreenService'];
