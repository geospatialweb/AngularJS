'use strict';

export function displayMarkerService($document, mapService, markerService)
{
	var markers = [];

	const displayMarkerService = this;

	displayMarkerService.addMarkers = layer =>
		markerService.markers[markerService.markersHash[layer]].forEach(marker =>
			marker.addTo(mapService.map)
		);

	displayMarkerService.removeMarkers = layer =>
		markerService.markers[markerService.markersHash[layer]].forEach(marker =>
			marker.remove()
		);

	displayMarkerService.hideMarkers = () =>
		markerService.markers.forEach(marker =>
		{
			const id = marker[0].getElement().id;
			const element = angular.element($document[0].querySelectorAll('div.' + id + '-marker'));

			if (element.length)
			{
				displayMarkerService.removeMarkers(id);
				markers.push(marker);
			}

			return true;
		});

	displayMarkerService.showMarkers = () =>
	{
		if (markers.length)
		{
			markers.forEach(marker =>
			{
				const id = marker[0].getElement().id;

				displayMarkerService.addMarkers(id);
				return true;
			});

			markers = [];
		}

		return true;
	};

	return displayMarkerService;
}
