(function () {
'use strict';

function layerService() {
	var layerService = this;

	layerService.biosphere = null;
	layerService.trails = null;
	layerService.layers  = [];
	layerService.layersHash = {};
	layerService.visibleLayers = [];

	return layerService;
}

module.exports = layerService;

return true;
})();
