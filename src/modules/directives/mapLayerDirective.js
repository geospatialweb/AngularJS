'use strict';

export default class mapLayerDirective
{
	constructor()
	{
		this.restrict = 'E';
		this.templateUrl = 'partials/mapLayer.html';
		this.controller = 'layerController as layers';
	}
}
