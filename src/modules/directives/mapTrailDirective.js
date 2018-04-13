'use strict';

export default class mapTrailDirective
{
	constructor()
	{
		this.restrict = 'E';
		this.templateUrl = 'partials/mapTrail.html';
		this.controller = 'trailController as trails';
	}
}
