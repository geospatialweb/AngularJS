(function () {
'use strict';

function layerController($document, $timeout, $window, mapService, showMarkerService) {
	var layer = this;

	layer.setLayer = function (layer, $event) {
		if ($event)
			$event.stopPropagation();

		var config = $window.config,
			el = angular.element($document[0].querySelectorAll('map-layers ul.layers li.' + layer)).children();

		if (el.hasClass(''))
			el.addClass('active');

		else
			el.removeClass('active');

		switch (layer) {
			case 'terrain':
				if (mapService.mapStyle === config.map.styles.dark)
					mapService.mapStyle = config.map.styles.outdoors;

				else
					mapService.mapStyle = config.map.styles.dark;

				mapService.map.setStyle(mapService.mapStyle, false);

				mapService.mapLayers.forEach(function (mapLayer) {
					if (!mapService.map.getLayer(mapLayer.id)) {
						$timeout(function () {
							mapService.map.addLayer(mapLayer);
							mapService.map.setLayoutProperty(mapLayer.id, 'visibility', 'visible');

							return true;
						}, 200);
					}

					return true;
				});

				break;

			case 'biosphere':
				if (el.hasClass('active')) {
					if (!mapService.map.getLayer(layer))
						mapService.map.addLayer(mapService.biosphere);

					mapService.map.setLayoutProperty(layer, 'visibility', 'visible');
					mapService.mapLayers.push(mapService.biosphere);

				} else {
					mapService.map.setLayoutProperty(layer, 'visibility', 'none');
					mapService.mapLayers.splice(mapService.mapLayers.indexOf(mapService.biosphere), 1);
				}

				break;

			case 'office':
				showMarkerService.showMarkers(layer);
				break;

			case 'places':
				showMarkerService.showMarkers(layer);
				break;

			case 'trails':
				if (el.hasClass('active')) {
					if (!mapService.map.getLayer(layer))
						mapService.map.addLayer(mapService.trails);

					mapService.map.setLayoutProperty(layer, 'visibility', 'visible');
					mapService.mapLayers.push(mapService.trails);

				} else {
					mapService.map.setLayoutProperty(layer, 'visibility', 'none');
					mapService.mapLayers.splice(mapService.mapLayers.indexOf(mapService.trails), 1);
				}

				showMarkerService.showMarkers(layer);

				break;

			case 'resetMap':
				$window.location.reload(true);
				break;
		}

		return true;
	};

	return layer;
}

layerController.$inject = ['$document', '$timeout', '$window', 'mapService', 'showMarkerService'];

module.exports = layerController;

return true;
})();
