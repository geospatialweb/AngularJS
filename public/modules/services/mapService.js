(function () {
'use strict';

function mapService($http) {
	var mapService = this;

//	mapService.basemap = 0;
	mapService.office = null;
	mapService.places = [];
	mapService.trails = [];

	mapService.map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/mapbox/dark-v9',
		center: [-76.3, 44.45],
		zoom: 9
	})
		.addControl(new mapboxgl.NavigationControl(), 'top-left')
		.on('load', function () {
			$http.get('/region')
				.then(function success(data) {
                    var region = {
						"id": "region",
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

					mapService.map.addLayer(region);

                    return true;

                }, function failure(data) {
                    return console.log(data, 'Query failed:\n $1');
                });

			$http.get('/office')
				.then(function success(data) {
					var el = document.createElement('div');

					el.className = 'office_marker';
					el.hidden = true;

					mapService.office = new mapboxgl.Marker(el)
						.setLngLat(data.data.features[0].geometry.coordinates)
						.setPopup(new mapboxgl.Popup({
							offset: 15
						})
							.setHTML('<b>' + data.data.features[0].properties.name + '</b><br>' + data.data.features[0].properties.description));

					return true;

				}, function failure(data) {
					return console.log(data, 'Query failed:\n $1');
				});

			$http.get('/places')
				.then(function success(data) {
					data.data.features.forEach(function (marker) {
						var el = document.createElement('div');

						el.className = 'place_marker';
						el.hidden = true;

						mapService.places.push(
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

			$http.get('/trails')
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
						if (marker.geometry.type === 'Point') {
							var el = document.createElement('div');

							el.className = 'trail_marker';
							el.hidden = true;

							mapService.trails.push(
								new mapboxgl.Marker(el)
									.setLngLat(marker.geometry.coordinates)
									.setPopup(new mapboxgl.Popup({
										offset: 15
									})
										.setHTML('<b>' + marker.properties.name + '</b><br>' + marker.properties.description))
							)
						}

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

app.service('mapService', mapService);
mapService.$inject = ['$http'];

return true;
})();
