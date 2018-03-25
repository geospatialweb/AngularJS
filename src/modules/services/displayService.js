(function () {
'use strict';

function displayService(layerService, mapService) {
	var displayService = this;

	/* temporarily hide active markers when toggling 'dark' and 'outdoors' map styles (basemaps) */
	displayService.hideActiveMarkers = function () {
		layerService.markers.forEach(function (marker) {
			var el = marker[0].getElement();

			if (!el.hidden) {
				displayService.hideMarkers(el.id);
				layerService.tempMarkers.push(marker);
			}

			return true;
		});

		return true;
	};

	/* unhide active markers when toggling 'dark' and 'outdoors' map styles (basemaps) */
	displayService.unhideActiveMarkers = function () {
		layerService.tempMarkers.forEach(function (marker) {
			var el = marker[0].getElement();

			displayService.showMarkers(el.id);

			return true;
		});

		layerService.tempMarkers = [];

		return true;
	};

	displayService.hideMarkers = function (layer) {
		layerService.markers[layerService.markersHash[layer]].forEach(function (marker) {
			hideMarker(marker);
			return true;
		});

		return true;
	};

	displayService.showMarkers = function (layer) {
		layerService.markers[layerService.markersHash[layer]].forEach(function (marker) {
			showMarker(marker);
			return true;
		});

		return true;
	};

	var hideMarker = function (marker) {
		var el = marker.getElement();

		if (!el.hidden)
			marker.remove();

		el.hidden = !el.hidden;

		return true;
	}

	var showMarker = function (marker) {
		var el = marker.getElement();

		if (el.hidden)
			marker.addTo(mapService.map);

		el.hidden = !el.hidden;

		return true;
	}

	return displayService;
}

displayService.$inject = ['layerService', 'mapService'];

module.exports = displayService;

return true;
})();
