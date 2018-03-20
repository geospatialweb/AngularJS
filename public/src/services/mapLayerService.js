(function () {
'use strict';

function mapLayerService(mapService, mapMarkerService) {
	var mapLayerService = this;

//	mapLayerService.basemap = 0;

	mapLayerService.displayMarkers = function (layer) {
		switch (layer) {
			case 'office':
				mapMarkerService.office.forEach(function (marker) {
					displayMarker(marker);
					return true;
				});

				break;

			case 'places':
				mapMarkerService.places.forEach(function (marker) {
					displayMarker(marker);
					return true;
				});

				break;

			case 'trails':
				mapMarkerService.trails.forEach(function (marker) {
					displayMarker(marker);
					return true;
				});

				break;
		}
	};

	var displayMarker = function (marker) {
		var el = marker.getElement();

		if (el.hidden)
			marker.addTo(mapService.map);

		else
			marker.remove();

		el.hidden = !el.hidden;

		return true;
	}

	return mapLayerService;
}

mapLayerService.$inject = ['mapService', 'mapMarkerService'];

module.exports = mapLayerService;

return true;
})();
