(function () {
'use strict';

function mapLayersController($document, $window, mapService, mapLayerService) {
	var layers = this;

	layers.setLayer = function (layer, $event) {
		if ($event)
			$event.stopPropagation();

		switch (layer) {
			case 'biosphere':
				var biosphere = angular.element($document[0].querySelectorAll('map-layers ul.layers li.' + layer)).children();

				if (biosphere.hasClass('')) {
					biosphere.addClass('active');

					try {
						mapService.map.setLayoutProperty(layer, 'visibility', 'visible');
					
					} catch (err) {
						console.error('Layer Error:\n', err);
					}

				} else {
					biosphere.removeClass('active');

					try {
						mapService.map.setLayoutProperty(layer, 'visibility', 'none');
					
					} catch (err) {
						console.error('Layer Error:\n', err);
					}
				}

				break;

			case 'office':
				var office = angular.element($document[0].querySelectorAll('map-layers ul.layers li.' + layer)).children();

				if (office.hasClass(''))
					office.addClass('active');

				else
					office.removeClass('active');

				mapLayerService.displayMarkers(layer);

				break;

			case 'places':
				var places = angular.element($document[0].querySelectorAll('map-layers ul.layers li.' + layer)).children();

				if (places.hasClass(''))
					places.addClass('active');

				else
					places.removeClass('active');

				mapLayerService.displayMarkers(layer);

				break;

			case 'trails':
				var trails = angular.element($document[0].querySelectorAll('map-layers ul.layers li.' + layer)).children();

				if (trails.hasClass('')) {
					trails.addClass('active');

					try {
						mapService.map.setLayoutProperty(layer, 'visibility', 'visible');
					
					} catch (err) {
						console.error('Layer Error:\n', err);
					}

				} else {
					trails.removeClass('active');

					try {
						mapService.map.setLayoutProperty(layer, 'visibility', 'none');
					
					} catch (err) {
						console.error('Layer Error:\n', err);
					}
				}

				mapLayerService.displayMarkers(layer);

				break;
/*
			case 'aerialView':
				var aerialView = angular.element($document[0].querySelectorAll('li.' + layer)).children();

				if (mapLayerService.basemap === 0) {
					aerialView.addClass('active');
					mapLayerService.basemap = 1;

					mapService.map.setStyle('mapbox://styles/mapbox/satellite-v9');

				} else {
					aerialView.removeClass('active');
					mapLayerService.basemap = 0;

					mapService.map.setStyle('mapbox://styles/mapbox/dark-v9');
				}

				break;
*/
			case 'resetMap':
				$window.location.reload(true);
				break;
		}

		return true;
	};	

	return layers;
}

mapLayersController.$inject = ['$document', '$window', 'mapService', 'mapLayerService'];

module.exports = mapLayersController;

return true;
})();
