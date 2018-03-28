(function () {
'use strict';

function layerService(markerService)
{
	var layerService = this;

	layerService.layers = [];
	layerService.layersHash = {};

	layerService.createHash = function ()
	{
		layerService.layers.forEach(function (layer, index)
		{
			layerService.layersHash[layer.id] = index;
			return true;
		});

		markerService.createHash();

		return true;
	};

	return layerService;
}

layerService.$inject = ['markerService'];

module.exports = layerService;

return true;
})();
