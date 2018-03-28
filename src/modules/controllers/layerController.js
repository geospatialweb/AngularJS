(function () {
'use strict';

function layerController($document, $timeout, $window, displayMarkerService, layerService, mapService, markerService)
{
	var layers = this;

	layers.setLayer = function (layer, $event)
	{
		var el = angular.element($document[0].querySelectorAll('map-layer ul.layers li.' + layer + ' div'));

		if ($event)
			$event.stopPropagation();

		if (angular.equals(layerService.layersHash, {}) && angular.equals(markerService.markersHash, {}))
		{
			layerService.createLayersHash();
			markerService.createMarkersHash();
		}

		if (!el.hasClass('active'))
			el.addClass('active');
		else
			el.removeClass('active');
		
		if (layer === 'terrain')
		{
			var config = $window.config;

			if (mapService.mapStyle === config.map.styles.dark)
				mapService.mapStyle = config.map.styles.outdoors;
			else
				mapService.mapStyle = config.map.styles.dark;

			mapService.map.setStyle(mapService.mapStyle);

			layerService.layers.forEach(function (layer)
			{
				$timeout(function ()
				{
					mapService.map.addLayer(layer);

					if (layer.layout.visibility === 'visible')
						mapService.map.setLayoutProperty(layer.id, 'visibility', 'visible');

					return true;
				}, 1000);

				return true;
			});

			/* for aesthetic purposes */
			displayMarkerService.hideVisibleMarkers();

			if (markerService.visibleMarkers.length)
				$timeout(function ()
				{
					displayMarkerService.showVisibleMarkers();
					return true;
				}, 1300);

		} else if (layer === 'biosphere' || layer === 'trails')
		{
			if (el.hasClass('active'))
			{
				mapService.map.setLayoutProperty(layer, 'visibility', 'visible');
				layerService.layers[layerService.layersHash[layer]].layout.visibility = 'visible';

				if (layer === 'trails')
					displayMarkerService.addMarkers(layer);

			} else
			{
				mapService.map.setLayoutProperty(layer, 'visibility', 'none');
				layerService.layers[layerService.layersHash[layer]].layout.visibility = 'none';

				if (layer === 'trails')
					displayMarkerService.removeMarkers(layer);
			}

		} else if (layer === 'office' || layer === 'places')
		{
			if (el.hasClass('active'))
				displayMarkerService.addMarkers(layer);
			else
				displayMarkerService.removeMarkers(layer);

		} else if (layer === 'resetMap')
			$window.location.reload(true);

		return true;
	};

	return layers;
}

layerController.$inject = ['$document', '$timeout', '$window', 'displayMarkerService', 'layerService', 'mapService', 'markerService'];

module.exports = layerController;

return true;
})();
