'use strict';

export default class MapLayerDirective
{
	constructor()
	{
		this.restrict = 'E';
		this.templateUrl = 'partials/mapLayer.html';
		this.controller = 'LayerController as layers';
	}
}
