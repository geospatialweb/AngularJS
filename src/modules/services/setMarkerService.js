(function () {
'use strict';

var mapboxgl = require('mapbox-gl');

function setMarkerService() {
	var setMarkerService = this;

	setMarkerService.office = [];
	setMarkerService.places = [];
	setMarkerService.trails = [];

	setMarkerService.setMarkers = function (data) {
		var layer = data.config.params.table,
			el;

		switch (layer) {
			case 'office':
				data.data.features.forEach(function (feature) {
					el = document.createElement('div');

					el.className = layer + '-marker';
					el.hidden = true;

					setMarkerService.office.push(
						new mapboxgl.Marker(el)
							.setLngLat(feature.geometry.coordinates)
							.setPopup(new mapboxgl.Popup({
								offset: 15
							})
								.setHTML('<b>' + feature.properties.name + '</b><br>' + feature.properties.description))
					)

					return true;
				});

				break;

			case 'places':
				data.data.features.forEach(function (feature) {
					el = document.createElement('div');

					el.className = layer + '-marker';
					el.hidden = true;

					setMarkerService.places.push(
						new mapboxgl.Marker(el)
							.setLngLat(feature.geometry.coordinates)
							.setPopup(new mapboxgl.Popup({
								offset: 15
							})
								.setHTML('<b>' + feature.properties.name + '</b><br>' + feature.properties.description))
					)

					return true;
				});

				break;

			case 'trails':
				data.data.features.forEach(function (feature) {
					el = document.createElement('div');

					el.className = layer + '-marker';
					el.hidden = true;

					setMarkerService.trails.push(
						new mapboxgl.Marker(el)
							.setLngLat([feature.properties.lng, feature.properties.lat])
							.setPopup(new mapboxgl.Popup({
								offset: 15
							})
								.setHTML('<b>' + feature.properties.name + '</b><br>' + feature.properties.description))
					)

					return true;
				});

				break;
		}

		return true;
	};

	return setMarkerService;
}

module.exports = setMarkerService;

return true;
})();
