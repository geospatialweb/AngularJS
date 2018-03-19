(function () {
'use strict';

const mapboxgl = require('mapbox-gl');

mapboxgl.accessToken = 'pk.eyJ1IjoiZ2Vvc3BhdGlhbHdlYiIsImEiOiJ6WGdOUFRvIn0.GoVRwZq5EfVsLNGyCqgZTw';

function mapService($http, mapMarkerService) {
	var mapService = this;

//	mapService.basemap = 0;

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
					db_table: 'biosphere'
				}
			})
				.then(function success(data) {
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

                    return true;

                }, function failure(data) {
                    return console.log(data, 'Query failed:\n $1');
                });

			$http.get('/layers', {
				params: {
					db_table: 'office'
				}
			})
				.then(function success(data) {
					var el = document.createElement('div'),
						feature = data.data.features[0];

					el.className = 'office_marker';
					el.hidden = true;

					mapMarkerService.office = new mapboxgl.Marker(el)
						.setLngLat(feature.geometry.coordinates)
						.setPopup(new mapboxgl.Popup({
							offset: 15
						})
							.setHTML('<b>' + feature.properties.name + '</b><br>' + feature.properties.description));

					return true;

				}, function failure(data) {
					return console.log(data, 'Query failed:\n $1');
				});

			$http.get('/layers', {
				params: {
					db_table: 'places'
				}
			})
				.then(function success(data) {
					data.data.features.forEach(function (marker) {
						var el = document.createElement('div');

						el.className = 'place_marker';
						el.hidden = true;

						mapMarkerService.places.push(
							new mapboxgl.Marker(el)
								.setLngLat(marker.geometry.coordinates)
								.setPopup(new mapboxgl.Popup({
									offset: 15
								})
									.setHTML('<b>' + marker.properties.name + '</b><br>' + marker.properties.description))
						)

						return true;
					});

					return true;

				}, function failure(data) {
					return console.log(data, 'Query failed:\n $1');
				});

			$http.get('/layers', {
				params: {
					db_table: 'trails'
				}
			})
				.then(function success(data) {
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

					data.data.features.forEach(function (marker) {
						var el = document.createElement('div');

						el.className = 'trail_marker';
						el.hidden = true;

						mapMarkerService.trails.push(
							new mapboxgl.Marker(el)
								.setLngLat([marker.properties.lng, marker.properties.lat])
								.setPopup(new mapboxgl.Popup({
									offset: 15
								})
									.setHTML('<b>' + marker.properties.name + '</b><br>' + marker.properties.description))
						)

						return true;
					});

					return true;

				}, function failure(data) {
					return console.log(data, 'Query failed:\n $1');
				});

			return true;
		});

	return mapService;
}

mapService.$inject = ['$http', 'mapMarkerService'];

module.exports = mapService;

return true;
})();
