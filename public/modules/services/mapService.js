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
		.on('load', function() {
			$http.get('/region')
				.then(function success(data) {
                    var regionLayer = {
						"id": "regionLayer",
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

					mapService.map.addLayer(regionLayer);

                    return true;

                }, function failure(data) {
                    console.log(data, 'Query failed:\n $1');
                    return true;
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

				}, function failure(data) {
					console.log(data, 'Query failed:\n $1');
					return true;
				});

			$http.get('/places')
				.then(function success(data) {
					data.data.features.forEach(function(marker) {
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

				}, function failure(data) {
					console.log(data, 'Query failed:\n $1');
					return true;
				});

			$http.get('/trails')
				.then(function success(data) {
					var trailsLayer = {
						"id": "trailsLayer",
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

					mapService.map.addLayer(trailsLayer);

					data.data.features.forEach(function(marker) {
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

				}, function failure(data) {
					console.log(data, 'Query failed:\n $1');
					return true;
				});

			return true;
		});
/*
	function displayTrail(n) {
		switch (n) {
			case 1:
				mapService.map.flyTo({
					center: [-76.04, 44.508],
					zoom: 12
				});

				break;

			case 2:
				mapService.map.flyTo({
					center: [-76.04, 44.508],
					zoom: 12
				});

				break;

			case 3:
				mapService.map.flyTo({
					center: [-76.61, 44.223],
					zoom: 14
				});

				break;

			case 4:
				mapService.map.flyTo({
					center: [-75.75, 44.575],
					zoom: 12
				});

				break;

			case 5:
				mapService.map.flyTo({
					center: [-75.75, 44.575],
					zoom: 12
				});

				break;

			case 6:
				mapService.map.flyTo({
					center: [-76.22, 44.485],
					zoom: 13
				});

				break;
		}

		return true;
	}
*/
	$('#regionLayer').click(function() {
		var visibility = mapService.map.getLayoutProperty(this.id, 'visibility');

		if (visibility === 'none') {
			this.children[0].className = 'active';
			mapService.map.setLayoutProperty(this.id, 'visibility', 'visible');

		} else {
			this.children[0].className = '';
			mapService.map.setLayoutProperty(this.id, 'visibility', 'none');
		}

		return true;
	});

	$('#officeLayer').click(function() {
		var el = mapService.office.getElement();

		if (el.hidden) {
			this.children[0].className = 'active';
			mapService.office.addTo(mapService.map);

		} else {
			this.children[0].className = '';
			mapService.office.remove();
		}

		el.hidden = !el.hidden;

		return true;
	});

	$('#placesLayer').click(function() {
		if (this.children[0].className === '')
			this.children[0].className = 'active';

		else
			this.children[0].className = '';

		mapService.places.forEach(function(place) {
			var el = place.getElement();

			if (el.hidden)
				place.addTo(mapService.map);

			else
				place.remove();

			el.hidden = !el.hidden;

			return true;
		});

		return true;
	});

	$('#trailsLayer').click(function() {
		var visibility = mapService.map.getLayoutProperty(this.id, 'visibility');

		if (visibility === 'none') {
			this.children[0].className = 'active';
			mapService.map.setLayoutProperty(this.id, 'visibility', 'visible');

		} else {
			this.children[0].className = '';
			mapService.map.setLayoutProperty(this.id, 'visibility', 'none');
		}

		mapService.trails.forEach(function(trail) {
			var el = trail.getElement();

			if (el.hidden)
				trail.addTo(mapService.map);

			else
				trail.remove();

			el.hidden = !el.hidden;

			return true;
		});

		return true;
	});
/*
	$('#aerialView').click(function() {
		if (mapService.basemap === 0) {
			this.children[0].className = 'active';
			mapService.map.setStyle('mapbox://styles/mapbox/satellite-v9');
			mapService.basemap = 1;

		} else {
			this.children[0].className = '';
			mapService.map.setStyle('mapbox://styles/mapbox/dark-v9');
			mapService.basemap = 0;
		}

		return true;
	});
*/
	$('#resetMap').click(function() {
		return location.reload(true);
	});

	return mapService;
}

app.service('mapService', mapService);
mapService.$inject = ['$http'];

return true;
})();
