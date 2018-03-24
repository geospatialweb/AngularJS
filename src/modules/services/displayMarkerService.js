(function () {
'use strict';

function displayMarkerService(mapService, setMarkerService) {
	var displayMarkerService = this;

	displayMarkerService.hideMarkers = function (layer) {
		switch (layer) {
			case 'office':
				setMarkerService.office.forEach(function (marker) {
					hideMarker(marker);
					return true;
				});

				break;

			case 'places':
				setMarkerService.places.forEach(function (marker) {
					hideMarker(marker);
					return true;
				});

				break;

			case 'trails':
				setMarkerService.trails.forEach(function (marker) {
					hideMarker(marker);
					return true;
				});

				break;
		}

		return true;
	};

	displayMarkerService.showMarkers = function (layer) {
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

	return displayMarkerService;
}

displayMarkerService.$inject = ['mapService', 'setMarkerService'];

module.exports = displayMarkerService;

return true;
})();
