(function () {
'use strict';

var mapboxgl = require('mapbox-gl');

function markerService(layerService) {
	var office = [],
		places = [],
		trails = [],
		markerService = this;

	markerService.setMarkers = function (data) {
		var layer = data.config.params.table;

		switch (layer) {
			case 'office':
				data.data.features.forEach(function (feature) {
					var el = document.createElement('div');

					el.id = layer;
					el.className = layer + '-marker';
					el.hidden = true;

					office.push(
						new mapboxgl.Marker(el)
							.setLngLat(feature.geometry.coordinates)
							.setPopup(new mapboxgl.Popup({
								offset: 15
							})
								.setHTML('<b>' + feature.properties.name + '</b><br>' + feature.properties.description))
					)

					return true;
				});

				layerService.markers.push(office);

				break;

			case 'places':
				data.data.features.forEach(function (feature) {
					var el = document.createElement('div');

					el.id = layer;
					el.className = layer + '-marker';
					el.hidden = true;

					places.push(
						new mapboxgl.Marker(el)
							.setLngLat(feature.geometry.coordinates)
							.setPopup(new mapboxgl.Popup({
								offset: 15
							})
								.setHTML('<b>' + feature.properties.name + '</b><br>' + feature.properties.description))
					)

					return true;
				});

				layerService.markers.push(places);

				break;

			case 'trails':
				data.data.features.forEach(function (feature) {
					var el = document.createElement('div');

					el.id = layer;
					el.className = layer + '-marker';
					el.hidden = true;

					trails.push(
						new mapboxgl.Marker(el)
							.setLngLat([feature.properties.lng, feature.properties.lat])
							.setPopup(new mapboxgl.Popup({
								offset: 15
							})
								.setHTML('<b>' + feature.properties.name + '</b><br>' + feature.properties.description))
					)

					return true;
				});

				layerService.markers.push(trails);

				break;
		}

		return true;
	};

	return markerService;
}

markerService.$inject = ['layerService'];

module.exports = markerService;

return true;
})();
