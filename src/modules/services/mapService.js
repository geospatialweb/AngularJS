(function () {
'use strict';

var config = window.config,
	mapboxgl = require('mapbox-gl');

mapboxgl.accessToken = config.map.accessToken;

function mapService($http, layerService, setMarkerService) {
	var mapService = this;

	mapService.mapStyle = config.map.styles.dark;

	mapService.map = new mapboxgl.Map({
		container: config.map.container,
		style: mapService.mapStyle,
		center: config.map.center,
		zoom: config.map.zoom
	})
		.addControl(new mapboxgl.NavigationControl(), config.map.control)
		.on('load', function () {
			$http.get('/layers', {
				params: {
					fields: config.layers.biosphere.postgres.fields,
					table: config.layers.biosphere.postgres.table
				}
			})
				.then(function success(data) {
					if (data && data.data) {
						layerService.biosphere = config.layers.biosphere.layer;
						layerService.biosphere.source.data = data.data;
						
						mapService.map.addLayer(layerService.biosphere);
						layerService.layers.push(layerService.biosphere);

					} else
						console.error('Data Error:\n', data);

                    return true;

                }, function failure(data) {
					console.error('Query Failed:\n', data);
					return true;
                });

			$http.get('/layers', {
				params: {
					fields: config.layers.office.postgres.fields,
					table: config.layers.office.postgres.table
				}
			})
				.then(function success(data) {
					if (data && data.data)
						setMarkerService.setMarkers(data);
					else
						console.error('Data Error:\n', data);

					return true;

				}, function failure(data) {
					console.error('Query Failed:\n', data);
					return true;
				});

			$http.get('/layers', {
				params: {
					fields: config.layers.places.postgres.fields,
					table: config.layers.places.postgres.table
				}
			})
				.then(function success(data) {
					if (data && data.data)
						setMarkerService.setMarkers(data);
					else
						console.error('Data Error:\n', data);

					return true;

				}, function failure(data) {
					console.error('Query Failed:\n', data);
					return true;
				});

			$http.get('/layers', {
				params: {
					fields: config.layers.trails.postgres.fields,
					table: config.layers.trails.postgres.table
				}
			})
				.then(function success(data) {
					if (data && data.data) {
						layerService.trails = config.layers.trails.layer;
						layerService.trails.source.data = data.data;

						mapService.map.addLayer(layerService.trails);
						layerService.layers.push(layerService.trails);

						setMarkerService.setMarkers(data);

					} else
						console.error('Data Error:\n', data);

					return true;

				}, function failure(data) {
					console.error('Query Failed:\n', data);
					return true;
				});

			return true;
		});

	return mapService;
}

mapService.$inject = ['$http', 'layerService', 'setMarkerService'];

module.exports = mapService;

return true;
})();
