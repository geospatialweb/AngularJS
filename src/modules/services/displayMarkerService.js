'use strict';

export default class DisplayMarkerService
{
	constructor($document, mapService, markerService)
	{
		this.$document = $document;
		this.mapService = mapService;
		this.markerService = markerService;
	}

	addMarkers(layer)
	{
		this.markerService.markers[this.markerService.markersHash[layer]]
			.map(marker => marker.addTo(this.mapService.map));

		return true;
	}

	removeMarkers(layer)
	{
		this.markerService.markers[this.markerService.markersHash[layer]]
			.map(marker => marker.remove());

		return true;
	}

	hideMarkers()
	{
		this.markerService.markers.map(marker =>
		{
			const id = marker[0].getElement().id;
			const element = angular.element(this.$document[0].querySelectorAll(`div.${id}-marker`));

			if (element.length)
			{
				this.removeMarkers(id);
				marker.hidden = true;
			}

			return true;
		});

		return true;
	}

	showMarkers()
	{
		this.markerService.markers.map(marker =>
		{
			if (marker.hidden)
			{
				const id = marker[0].getElement().id;

				this.addMarkers(id);
				marker.hidden = false;
			}

			return true;
		});

		return true;
	}
}

DisplayMarkerService.$inject = ['$document', 'mapService', 'markerService'];
