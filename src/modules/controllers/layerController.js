(function () {
'use strict';

function layerController($document, $timeout, $window, displayMarkerService, mapService, markerService)
{
	var layers = this;

	layers.setLayer = function (layer, $event)
	{
		if ($event)
			$event.stopPropagation();

		if (angular.equals(mapService.layersHash, {}) && angular.equals(markerService.markersHash, {}))
		{
			mapService.createLayersHash();
			markerService.createMarkersHash();
		}

		var element = angular.element($document[0].querySelectorAll('map-layer ul.layers li.' + layer + ' div'));

		if (!element.hasClass('active'))
			element.addClass('active');

		else
			element.removeClass('active');

		if (layer === 'terrain')
		{
			/* change between 'dark' and 'outdoors' map styles (basemaps) */
			mapService.changeStyle();

			/* hide active markers when changing map styles for aesthetic purposes */
			displayMarkerService.hideMarkers();

			/* show active markers after changing map styles for aesthetic purposes */
			$timeout(function ()
			{
				displayMarkerService.showMarkers();
				return true;

			},1200);

		} else if (layer === 'biosphere' || layer === 'trails')
		{
			if (element.hasClass('active'))
			{				
				mapService.map.setLayoutProperty(layer, 'visibility', 'visible');
				mapService.layers[mapService.layersHash[layer]].layout.visibility = 'visible';

				if (layer === 'trails')
					displayMarkerService.addMarkers(layer);

			} else
			{
				mapService.map.setLayoutProperty(layer, 'visibility', 'none');
				mapService.layers[mapService.layersHash[layer]].layout.visibility = 'none';

				if (layer === 'trails')
					displayMarkerService.removeMarkers(layer);
			}

		} else if (layer === 'office' || layer === 'places')
		{
			if (element.hasClass('active'))
				displayMarkerService.addMarkers(layer);

			else
				displayMarkerService.removeMarkers(layer);

		} else if (layer === 'resetMap')
			$window.location.reload(true);

		return true;
	};

	return layers;
}

layerController.$inject = ['$document', '$timeout', '$window', 'displayMarkerService', 'mapService', 'markerService'];

module.exports = layerController;

return true;
})();
