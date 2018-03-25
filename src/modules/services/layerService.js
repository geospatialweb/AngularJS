(function () {
'use strict';

function layerService() {
	var layerService = this;

	layerService.layers = [];
	layerService.layersHash = {};
	layerService.markers = [];
	layerService.markersHash = {};
	layerService.tempMarkers = [];

	return layerService;
}

module.exports = layerService;

return true;
})();
