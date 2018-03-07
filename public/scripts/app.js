'use strict';

mapboxgl.accessToken = 'pk.eyJ1IjoiZ2Vvc3BhdGlhbHdlYiIsImEiOiJ6WGdOUFRvIn0.GoVRwZq5EfVsLNGyCqgZTw';

var map, office,
	places = [],
	trails = [];

trailList.selectedIndex = 0;

map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v9',
	center: [-76.3, 44.45],
    zoom: 9
})
	.addControl(new mapboxgl.NavigationControl(), 'top-left')
	.on('load', function() {
		$.get('/region').done(function(data) {
			var regionLayer = {
				"id": "regionLayer",
				"type": "fill",
				"source": {
					"type": "geojson",
					"data": JSON.parse(data)
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

			map.addLayer(regionLayer);

			return true;
		});

		$.get('/office').done(function(data) {
			var el = document.createElement('div');
		
			el.className = 'office_marker';
			el.hidden = true;
		
			office = new mapboxgl.Marker(el)
				.setLngLat(data.features[0].geometry.coordinates)
				.setPopup(new mapboxgl.Popup({
					offset: 15
				})
					.setHTML('<b>' + data.features[0].properties.name + '</b><br>' + data.features[0].properties.description));
		
			return true;
		});

		$.get('/places').done(function(data) {
			data.features.forEach(function(marker) {
				var el = document.createElement('div');
				
				el.className = 'place_marker';
				el.hidden = true;
			
				places.push(
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
		});

		$.get('/trails').done(function(data) {
			var trailsLayer = {
				"id": "trailsLayer",
				"type": "line",
				"source": {
					"type": "geojson",
					"data": data
				},
				"layout": {
					"visibility": "none",
				},
				"paint": {
					"line-color": "#aa0000",
					"line-width": 2
				}
			};

			map.addLayer(trailsLayer);

			data.features.forEach(function(marker) {
				if (marker.geometry.type === 'Point') {
					var el = document.createElement('div');
					
					el.className = 'trail_marker';
					el.hidden = true;
				
					trails.push(
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
		});

		return true;
	});

function displayTrail(n) {
	switch (n) {
		case 1:
			map.flyTo({
				center: [-76.04, 44.508],
				zoom: 12
			});

			break;

		case 2:
			map.flyTo({
				center: [-76.04, 44.508],
				zoom: 12
			});

			break;

		case 3:
			map.flyTo({
				center: [-76.61, 44.223],
				zoom: 14
			});

			break;

		case 4:
			map.flyTo({
				center: [-75.75, 44.575],
				zoom: 12
			});

			break;

		case 5:
			map.flyTo({
				center: [-75.75, 44.575],
				zoom: 12
			});

			break;

		case 6:
			map.flyTo({
				center: [-76.22, 44.485],
				zoom: 13
			});

			break;
	}

	return true;
}

$('#regionLayer').click(function() {
	var visibility = map.getLayoutProperty(this.id, 'visibility');

	if (visibility === 'none')
		map.setLayoutProperty(this.id, 'visibility', 'visible');

	else
		map.setLayoutProperty(this.id, 'visibility', 'none');

	return true;
});

$('#officeLayer').click(function() {
	var el = office.getElement();

	if (el.hidden)
		office.addTo(map);

	else
		office.remove();

	el.hidden = !el.hidden;

	return true;
});

$('#placesLayer').click(function() {
	places.forEach(function(place) {
		var el = place.getElement();

		if (el.hidden)
			place.addTo(map);

		else
			place.remove();

		el.hidden = !el.hidden;

		return true;
	});

	return true;
});

$('#trailsLayer').click(function() {
	var visibility = map.getLayoutProperty(this.id, 'visibility');

	if (visibility === 'none')
		map.setLayoutProperty(this.id, 'visibility', 'visible');

	else
		map.setLayoutProperty(this.id, 'visibility', 'none');

	trails.forEach(function(trail) {
		var el = trail.getElement();

		if (el.hidden)
			trail.addTo(map);

		else
			trail.remove();

		el.hidden = !el.hidden;

		return true;
	});

	return true;
});

$('#resetMap').click(function() {
	return location.reload(true);
});
