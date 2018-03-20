(function () {
'use strict';

const mapboxgl = require('mapbox-gl');

mapboxgl.accessToken = 'pk.eyJ1IjoiZ2Vvc3BhdGlhbHdlYiIsImEiOiJ6WGdOUFRvIn0.GoVRwZq5EfVsLNGyCqgZTw';

function mapService($http, mapMarkerService) {
	var mapService = this;

	mapService.map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/mapbox/dark-v9',
		center: [-76.3, 44.45],
		zoom: 9
	})
		.addControl(new mapboxgl.NavigationControl(), 'top-left')
		.on('load', function () {
			$http.get('/layers', {
				params: {
					fields: 'name, description, ST_AsGeoJSON(geom)',
					table: 'biosphere'
				}
			})
				.then(function success(data) {
					if (data && data.data) {
						var biosphere = {
							"id": "biosphere",
							"type": "fill",
							"source": {
								"type": "geojson",
								"data": data.data
							},
							"layout": {
								"visibility": "none",
							},
							"paint": {
								"fill-color": "#fff",
								"fill-opacity": .25,
								"fill-outline-color": "#000"
							}
						};

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
					fields: 'name, description, ST_AsGeoJSON(geom)',
					table: 'office'
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
					fields: 'name, description, ST_AsGeoJSON(geom)',
					table: 'places'
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
					fields: 'name, description, lat, lng, ST_AsGeoJSON(geom)',
					table: 'trails'
				}
			})
				.then(function success(data) {
					if (data && data.data) {
						var trails = {
							"id": "trails",
							"type": "line",
							"source": {
								"type": "geojson",
								"data": data.data
							},
							"layout": {
								"visibility": "none",
							},
							"paint": {
								"line-color": "#aa0000",
								"line-width": 2
							}
						};

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
