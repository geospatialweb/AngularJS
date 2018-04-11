'use strict';

displayMarkerService.$inject = ['$document', 'mapService', 'markerService'];

export function displayMarkerService($document, mapService, markerService)
{
	const displayMarkerService = this;

	displayMarkerService.addMarkers = layer =>
		markerService.markers[markerService.markersHash[layer]].map(marker =>
			marker.addTo(mapService.map)
		);

	displayMarkerService.removeMarkers = layer =>
		markerService.markers[markerService.markersHash[layer]].map(marker =>
			marker.remove()
		);

	displayMarkerService.hideMarkers = () =>
		markerService.markers.map(marker =>
		{
			const id = marker[0].getElement().id;
			const element = angular.element($document[0].querySelectorAll(`div.${id}-marker`));

			if (element.length)
			{
				displayMarkerService.removeMarkers(id);
				marker.hidden = true;
			}

			return true;
		});

	displayMarkerService.showMarkers = () =>
		markerService.markers.map(marker =>
		{
			if (marker.hidden)
			{
				const id = marker[0].getElement().id;

				displayMarkerService.addMarkers(id);
				marker.hidden = false;
			}

			return true;
		});

	return displayMarkerService;
}
