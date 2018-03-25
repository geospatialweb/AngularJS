(function () {
'use strict';

function layerController($document, $timeout, $window, displayService, layerService, mapService) {
	var layers = this;

	layers.setLayer = function (layer, $event) {
		var el = angular.element($document[0].querySelectorAll('map-layers ul.layers li.' + layer)).children();

		if ($event)
			$event.stopPropagation();

		if (angular.equals(layerService.layersHash, {}) && angular.equals(layerService.markersHash, {}))
			layerService.createHash();

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

			displayService.hideActiveMarkers();

			mapService.map.setStyle(mapService.mapStyle, false);

			if (layerService.tempMarkers.length)
				$timeout(function () {
					displayService.unhideActiveMarkers();
					return true;
				}, 1000);

			layerService.layers.forEach(function (layer) {
				if (!mapService.map.getLayer(layer.id) && layer.layout.visibility === 'visible')
					$timeout(function () {
						mapService.map.addLayer(layer);
						mapService.map.setLayoutProperty(layer.id, 'visibility', 'visible');
						layerService.layers[layer.layout.visibility = 'visible'];

						return true;
					}, 1000);

				return true;
			});

		} else if (layer === 'biosphere' || layer === 'trails') {
			if (el.hasClass('active')) {
				mapService.map.setLayoutProperty(layer, 'visibility', 'visible');
				layerService.layers[layerService.layersHash[layer]].layout.visibility = 'visible';

				if (layer === 'trails')
					displayService.showMarkers(layer);

			} else {
				mapService.map.setLayoutProperty(layer, 'visibility', 'none');
				layerService.layers[layerService.layersHash[layer]].layout.visibility = 'none';

				if (layer === 'trails')
					displayService.hideMarkers(layer);
			}

		} else if (layer === 'office' || layer === 'places') {
			if (el.hasClass('active'))
				displayService.showMarkers(layer);
			else
				displayService.hideMarkers(layer);

		} else if (layer === 'resetMap')
			$window.location.reload(true);

		return true;
	};

	return layers;
}

layerController.$inject = ['$document', '$timeout', '$window', 'displayService', 'layerService', 'mapService'];

module.exports = layerController;

return true;
})();
