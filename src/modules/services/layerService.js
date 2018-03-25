(function () {
'use strict';

function layerService() {
	var layerService = this;

	layerService.layers = [];
	layerService.layersHash = {};
	layerService.markers = [];
	layerService.markersHash = {};
	layerService.tempMarkers = [];

	layerService.createHash = function () {
		layerService.layers.forEach(function (layer, index) {
			layerService.layersHash[layer.id] = index;
			return true;
		});

		layerService.markers.forEach(function (marker, index) {
			var el = marker[0].getElement();

			layerService.markersHash[el.id] = index;
			return true;
		});

		return true;
	};

	return layerService;
}

module.exports = layerService;

return true;
})();
