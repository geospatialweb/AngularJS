(function () {
'use strict';

function showMarkerService(mapService, setMarkerService) {
	var showMarkerService = this;

	showMarkerService.showMarkers = function (layer) {
		switch (layer) {
			case 'office':
				setMarkerService.office.forEach(function (marker) {
					showMarker(marker);
					return true;
				});

				break;

			case 'places':
				setMarkerService.places.forEach(function (marker) {
					showMarker(marker);
					return true;
				});

				break;

			case 'trails':
				setMarkerService.trails.forEach(function (marker) {
					showMarker(marker);
					return true;
				});

				break;
		}
	};

	var showMarker = function (marker) {
		var el = marker.getElement();

		if (el.hidden)
			marker.addTo(mapService.map);

		else
			marker.remove();

		el.hidden = !el.hidden;

		return true;
	}

	return showMarkerService;
}

showMarkerService.$inject = ['mapService', 'setMarkerService'];

module.exports = showMarkerService;

return true;
})();
