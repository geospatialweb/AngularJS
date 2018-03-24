(function () {
'use strict';

function layerService() {
	var layerService = this;

	layerService.layers  = [];
	layerService.layersHash = {};
	layerService.visibleLayers = [];

	return layerService;
}

module.exports = layerService;

return true;
})();
