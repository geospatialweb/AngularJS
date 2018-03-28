(function () {
'use strict';

function displayMarkerService($document, mapService, markerService)
{
	var displayMarkers = [],
		displayMarkerService = this;

	displayMarkerService.addMarkers = function (layer)
		{
			markerService.markers[markerService.markersHash[layer]].forEach(function (marker)
			{
				marker.addTo(mapService.map);
				return true;
			});

			return true;
		};

	displayMarkerService.removeMarkers = function (layer)
	{
		markerService.markers[markerService.markersHash[layer]].forEach(function (marker)
		{
			marker.remove();
			return true;
		});

		return true;
	};

	displayMarkerService.hideMarkers = function ()
	{
		markerService.markers.forEach(function (marker)
		{
			var layer = marker[0].getElement().id,
				el = angular.element($document[0].querySelectorAll('div.' + layer + '-marker'));

			if (el.length)
			{
				displayMarkerService.removeMarkers(layer);

				displayMarkers.push(marker);
			}

			return true;
		});

		return true;
	};

	displayMarkerService.showMarkers = function ()
	{
		if (displayMarkers.length)
		{
			displayMarkers.forEach(function (marker)
			{
				var layer = marker[0].getElement().id;

				displayMarkerService.addMarkers(layer);
				return true;
			});

			displayMarkers = [];
		}
	};

	return displayMarkerService;
}

displayMarkerService.$inject = ['$document', 'mapService', 'markerService'];

module.exports = displayMarkerService;

return true;
})();
