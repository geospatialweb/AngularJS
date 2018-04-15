'use strict';

export default class MapTrailDirective
{
	constructor()
	{
		this.restrict = 'E';
		this.templateUrl = 'partials/mapTrail.html';
		this.controller = 'TrailController as trails';
	}
}
