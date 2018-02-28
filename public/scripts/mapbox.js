'use strict';

L.mapbox.accessToken = 'pk.eyJ1IjoiZ2Vvc3BhdGlhbHdlYiIsImEiOiJ6WGdOUFRvIn0.GoVRwZq5EfVsLNGyCqgZTw';

var map, office, placeName,	region,	trail;

trailList.selectedIndex = 0;

map = L.mapbox.map('map', null, {
	attributionControl: {
		compact: true
	},
	center: [44.6, -76.2],
	closePopupOnClick: true,
	doubleClickZoom: true,
	zoomControl: false,
	zoom: 8
});

L.control.layers({
	'Aerial':  L.mapbox.tileLayer('mapbox.streets-satellite'),
	'Black':   L.mapbox.tileLayer('examples.map-cnkhv76j').addTo(map),
	'Streets': L.mapbox.tileLayer('mapbox.streets'),
	'Terrain': L.mapbox.tileLayer('mapbox.run-bike-hike')
}, null, {
	'position': 'topleft'
})
	.addTo(map);

$.get('/mapbox').done(function(data) {
	region = L.geoJson(JSON.parse(data), {
		style: { 'color': '#000000', 'weight': 1, 'opacity': .5, 'fillColor': '#ffffff', 'fillOpacity': .25 }
	});
});

$.get('/office').done(function(data) {
	office = L.geoJson(data, {
		pointToLayer: function(feature, latlng) {
			return  L.marker(latlng, { icon: L.icon({
					iconUrl: '/images/office.png',
					iconAnchor: [ 10, 15 ],
					popupAnchor: [ 1, 0 ]
				})
			});
		},

		onEachFeature: function(feature, layer) {
			if (feature.properties.name && feature.properties.description)
				layer.bindPopup('<b>' + feature.properties.name + '</b><br>' + feature.properties.description);
		}
	});
});

$.get('/placename').done(function(data) {
	placeName = L.geoJson(data, {
		pointToLayer: function(feature, latlng) {
			return  L.marker(latlng, { icon: L.icon({
					iconUrl: '/images/placename.png',
					iconAnchor: [ 10, 15 ],
					popupAnchor: [ 1, 0 ]
				})
			});
		},

		onEachFeature: function(feature, layer) {
			if (feature.properties.name && feature.properties.description)
				layer.bindPopup('<b>' + feature.properties.name + '</b><br>' + feature.properties.description);
		}
	});
});

$.get('/trail').done(function(data) {
	trail = L.geoJson(data, {
		style: { 'color': '#aa0000', 'weight': 3, 'opacity': 1 },

		pointToLayer: function(feature, latlng) {
			return  L.marker(latlng, { icon: L.icon({
					iconUrl: '/images/trail.png',
					iconAnchor: [ 10, 20 ],
					popupAnchor: [ 1, -5 ]
				})
			});
		},

		onEachFeature: function(feature, layer) {
			if (feature.properties.name && feature.properties.description)
				layer.bindPopup('<b>' + feature.properties.name + '</b><br>' + feature.properties.description);
		}
	})
		.addTo(map);
});

function displayTrail(n) {
	switch (n) {
		case 1:
			map.setView([ 44.515, -76.042 ], 13);
			break;

		case 2:
			map.setView([ 44.515, -76.042 ], 13);
			break;

		case 3:
			map.setView([ 44.228, -76.609 ], 14);
			break;

		case 4:
			map.setView([ 44.579, -75.753 ], 12);
			break;

		case 5:
			map.setView([ 44.579, -75.753 ], 12);
			break;

		case 6:
			map.setView([ 44.492, -76.213 ], 13);
			break;
	}
}

$('#regionLayer').click(function() {
	if (map.hasLayer(region)) map.removeLayer(region);
	else map.addLayer(region);
});

$('#officeLayer').click(function() {
	if (map.hasLayer(office)) map.removeLayer(office);
	else map.addLayer(office);
});

$('#placeNameLayer').click(function() {
	if (map.hasLayer(placeName)) map.removeLayer(placeName);
	else map.addLayer(placeName);
});

$('#trailLayer').click(function() {
	if (map.hasLayer(trail)) map.removeLayer(trail);
	else map.addLayer(trail);
});

$('#resetMap').click(function() {
	location.reload(true);
});
