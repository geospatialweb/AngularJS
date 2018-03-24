(function () {
'use strict';

function layerController($document, $timeout, $window, displayMarkerService, layerService, mapService) {
	var layers = this;

	layers.setLayer = function (layer, $event) {
		if ($event)
			$event.stopPropagation();

		if (angular.equals(layerService.layersHash, {}))
			layerService.layers.forEach(function (layer) {
				layerService.layersHash[layer.id] = layer;
				return true;
			});

		var el = angular.element($document[0].querySelectorAll('map-layers ul.layers li.' + layer)).children();

		if (el.hasClass(''))
			el.addClass('active');
		else
			el.removeClass('active');

		if (layer === 'terrain') {
			var config = $window.config;

			if (mapService.mapStyle === config.map.styles.dark)
				mapService.mapStyle = config.map.styles.outdoors;
			else
				mapService.mapStyle = config.map.styles.dark;

			mapService.map.setStyle(mapService.mapStyle, false);

			layerService.visibleLayers.forEach(function (layer) {
				if (!mapService.map.getLayer(layer.id))
					$timeout(function () {
						mapService.map.addLayer(layer);
						mapService.map.setLayoutProperty(layer.id, 'visibility', 'visible');

						return true;
					}, 500);

				return true;
			});

		} else if (layer === 'biosphere' || layer === 'trails') {
			if (el.hasClass('active')) {
				mapService.map.setLayoutProperty(layer, 'visibility', 'visible');
				layerService.visibleLayers.push(layerService.layersHash[layer]);

				if (layer === 'trails')
					displayMarkerService.showMarkers(layer);

			} else {
				mapService.map.setLayoutProperty(layer, 'visibility', 'none');
				layerService.visibleLayers.splice(layerService.visibleLayers.indexOf(layerService.layersHash[layer]), 1);

				if (layer === 'trails')
					displayMarkerService.hideMarkers(layer);
			}

		} else if (layer === 'office' || layer === 'places') {
			if (el.hasClass('active'))
				displayMarkerService.showMarkers(layer);
			else
				displayMarkerService.hideMarkers(layer);

		} else if (layer === 'resetMap')
			$window.location.reload(true);

		return true;
	};

	return layers;
}

layerController.$inject = ['$document', '$timeout', '$window', 'displayMarkerService', 'layerService', 'mapService'];

module.exports = layerController;

return true;
})();
