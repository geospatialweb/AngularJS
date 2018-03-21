(function () {
'use strict';

var config = {
	layers: {
		biosphere: {
			table: 'biosphere',
			fields: 'name, description, ST_AsGeoJSON(geom)',
			layer: {
				"id": "biosphere",
				"type": "fill",
				"source": {
					"type": "geojson"
				},
				"layout": {
					"visibility": "none"
				},
				"paint": {
					"fill-color": "#fff",
					"fill-opacity": .25,
					"fill-outline-color": "#000"
				}
			}
		},
		office: {
			table: 'office',
			fields: 'name, description, ST_AsGeoJSON(geom)'
		},
		places: {
			table: 'places',
			fields: 'name, description, ST_AsGeoJSON(geom)'
		},
		trails: {
			table: 'trails',
			fields: 'name, description, lat, lng, ST_AsGeoJSON(geom)',
			layer: {
				"id": "trails",
				"type": "line",
				"source": {
					"type": "geojson"
				},
				"layout": {
					"visibility": "none"
				},
				"paint": {
					"line-color": "#aa0000",
					"line-width": 2
				}
			}
		}
	},
	map: {
		accessToken: 'pk.eyJ1IjoiZ2Vvc3BhdGlhbHdlYiIsImEiOiJ6WGdOUFRvIn0.GoVRwZq5EfVsLNGyCqgZTw',
		center: [-76.3, 44.45],
		container: 'map',
		control: 'top-left',
		style: 'mapbox://styles/mapbox/dark-v9',
		zoom: 9
	}
}

module.exports = config;

return true;
})();
