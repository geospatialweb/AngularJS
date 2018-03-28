(function () {
'use strict';

var config = {
	map: {
		accessToken: 'pk.eyJ1IjoiZ2Vvc3BhdGlhbHdlYiIsImEiOiJ6WGdOUFRvIn0.GoVRwZq5EfVsLNGyCqgZTw',
		center: [-76.3, 44.45],
		container: 'map',
		control: {
			position: 'top-left'
		},
		styles: {
			dark: 'mapbox://styles/mapbox/dark-v9',
			outdoors: 'mapbox://styles/mapbox/outdoors-v9'
		},
		zoom: 9
	},
	layers: {
		biosphere: {
			layer: {
				id: 'biosphere',
				type: 'fill',
				source: {
					type: 'geojson'
				},
				layout: {
					visibility: 'visible'
				},
				paint: {
					'fill-color': '#090',
					'fill-opacity': .25,
					'fill-outline-color': '#000'
				}
			},
			postgres: {
				table: 'biosphere',
				fields: 'name, description, ST_AsGeoJSON(geom)'
			}
		},
		office: {
			postgres: {
				table: 'office',
				fields: 'name, description, ST_AsGeoJSON(geom)'
			}
		},
		places: {
			postgres: {
				table: 'places',
				fields: 'name, description, ST_AsGeoJSON(geom)'
			}
		},
		trails: {
			layer: {
				id: 'trails',
				type: 'line',
				source: {
					type: 'geojson'
				},
				layout: {
					visibility: 'none'
				},
				paint: {
					'line-color': '#aa0000',
					'line-width': 2
				}
			},
			postgres: {
				table: 'trails',
				fields: 'name, description, lat, lng, ST_AsGeoJSON(geom)',
			}
		}
	}
}

module.exports = config;

return true;
})();
