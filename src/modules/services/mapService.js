(function () {
'use strict';

var config = window.config,
	mapboxgl = require('mapbox-gl');

mapboxgl.accessToken = config.map.accessToken;

function mapService($http, mapMarkerService) {
	var mapService = this;

	mapService.map = new mapboxgl.Map({
		container: config.map.container,
		style: config.map.style,
		center: config.map.center,
		zoom: config.map.zoom
	})
		.addControl(new mapboxgl.NavigationControl(), config.map.control)
		.on('load', function () {
			$http.get('/layers', {
				params: {
					fields: config.layers.biosphere.fields,
					table: config.layers.biosphere.table
				}
			})
				.then(function success(data) {
					if (data && data.data) {
						var biosphere = config.layers.biosphere.layer;
						biosphere.source.data = data.data;

						mapService.map.addLayer(biosphere);

					} else
						console.error('Data Error:\n', data);

                    return true;

                }, function failure(data) {
					console.error('Query Failed:\n', data);
					return true;
                });

			$http.get('/layers', {
				params: {
					fields: config.layers.office.fields,
					table: config.layers.office.table
				}
			})
				.then(function success(data) {
					if (data && data.data)
						mapMarkerService.setMarkers(data);

					else
						console.error('Data Error:\n', data);

					return true;

				}, function failure(data) {
					console.error('Query Failed:\n', data);
					return true;
				});

			$http.get('/layers', {
				params: {
					fields: config.layers.places.fields,
					table: config.layers.places.table
				}
			})
				.then(function success(data) {
					if (data && data.data)
						mapMarkerService.setMarkers(data);

					else
						console.error('Data Error:\n', data);

					return true;

				}, function failure(data) {
					console.error('Query Failed:\n', data);
					return true;
				});

			$http.get('/layers', {
				params: {
					fields: config.layers.trails.fields,
					table: config.layers.trails.table
				}
			})
				.then(function success(data) {
					if (data && data.data) {
						var trails = config.layers.trails.layer;
						trails.source.data = data.data;

						mapService.map.addLayer(trails);
						mapMarkerService.setMarkers(data);

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

mapService.$inject = ['$http', 'mapMarkerService'];

module.exports = mapService;

return true;
})();
