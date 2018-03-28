(function () {
'use strict';

function layerService() {
	var layerService = this;

	layerService.layers = [];
	layerService.layersHash = {};

	layerService.createLayersHash = function () {
		layerService.layers.forEach(function (layer, index) {
			layerService.layersHash[layer.id] = index;
			return true;
		});

		return true;
	};

	return layerService;
}

module.exports = layerService;

return true;
})();
