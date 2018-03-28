(function () {
'use strict';

function displayMarkerService($document, mapService, markerService)
{
	var displayMarkerService = this;

	displayMarkerService.removeMarkers = function (layer)
	{
		markerService.markers[markerService.markersHash[layer]].forEach(function (marker)
		{
			marker.remove();
			return true;
		});

		return true;
	};

	
	displayMarkerService.addMarkers = function (layer)
	{
		markerService.markers[markerService.markersHash[layer]].forEach(function (marker)
		{
			marker.addTo(mapService.map);
			return true;
		});

		return true;
	};

	/* hide visible markers when toggling 'dark' and 'outdoors' map styles (basemaps) for aesthetic purposes */
	displayMarkerService.hideVisibleMarkers = function ()
	{
		markerService.markers.forEach(function (marker)
		{
			var layer = marker[0].getElement().id,
				el = angular.element($document[0].querySelectorAll('div.' + layer + '-marker'));

			if (el.length)
			{
				displayMarkerService.removeMarkers(layer);
				markerService.visibleMarkers.push(marker);
			}

			return true;
		});

		return true;
	};

	/* show visible markers after toggling 'dark' and 'outdoors' map styles (basemaps) for aesthetic purposes */
	displayMarkerService.showVisibleMarkers = function ()
	{
		markerService.visibleMarkers.forEach(function (marker)
		{
			var layer = marker[0].getElement().id;

			displayMarkerService.addMarkers(layer);
			return true;
		});

		markerService.visibleMarkers = [];

		return true;
	};

	return displayMarkerService;
}

displayMarkerService.$inject = ['$document', 'mapService', 'markerService'];

module.exports = displayMarkerService;

return true;
})();
