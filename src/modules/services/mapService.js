(function () {
'use strict';

var config = window.config,
	mapboxgl = require('mapbox-gl');

mapboxgl.accessToken = config.map.accessToken;

function mapService($document, $http, $timeout, layerService, markerService, splashScreenService)
{
	var style = config.map.styles.default,
		mapService = this;

	mapService.map = new mapboxgl.Map({
		container: config.map.container,
		style: style,
		center: config.map.center,
		zoom: config.map.zoom
	})
		.addControl(new mapboxgl.NavigationControl(), config.map.control.position)
		.on('styledata', function (event)
		{
			var el = angular.element($document[0].querySelectorAll('splash-screen div'));
			
			if (event.target._loaded && el.hasClass('visible'))
				splashScreenService.hideSplashScreen();

			return true;
		})
		.on('load', function ()
		{
			$http.get('/layers', {
				params: {
					fields: config.layers.biosphere.postgres.fields,
					table: config.layers.biosphere.postgres.table
				}
			})
				.then(function success(data)
				{
					if (data && data.data)
					{
						var biosphere = config.layers.biosphere.layer;
						biosphere.source.data = data.data;

						mapService.map.addLayer(biosphere);
						layerService.layers.push(biosphere);

					} else
						console.error('Data Error:\n', data);

                    return true;

				}, function failure(data)
				{
					console.error('Query Failed:\n', data);
					return true;
                });

			$http.get('/layers', {
				params: {
					fields: config.layers.office.postgres.fields,
					table: config.layers.office.postgres.table
				}
			})
				.then(function success(data)
				{
					if (data && data.data)
						markerService.setMarkers(data);

					else
						console.error('Data Error:\n', data);

					return true;

				}, function failure(data)
				{
					console.error('Query Failed:\n', data);
					return true;
				});

			$http.get('/layers', {
				params: {
					fields: config.layers.places.postgres.fields,
					table: config.layers.places.postgres.table
				}
			})
				.then(function success(data)
				{
					if (data && data.data)
						markerService.setMarkers(data);

					else
						console.error('Data Error:\n', data);

					return true;

				}, function failure(data)
				{
					console.error('Query Failed:\n', data);
					return true;
				});

			$http.get('/layers', {
				params: {
					fields: config.layers.trails.postgres.fields,
					table: config.layers.trails.postgres.table
				}
			})
				.then(function success(data)
				{
					if (data && data.data)
					{
						var trails = config.layers.trails.layer;
						trails.source.data = data.data;

						mapService.map.addLayer(trails);
						layerService.layers.push(trails);

						markerService.setMarkers(data);

					} else
						console.error('Data Error:\n', data);

					return true;

				}, function failure(data)
				{
					console.error('Query Failed:\n', data);
					return true;
				});

			return true;
		});

		/* toggle 'dark' and 'outdoors' map styles (basemaps) */
		mapService.setStyle = function ()
		{
			if (style === config.map.styles.default)
				style = config.map.styles.outdoors;

			else
				style = config.map.styles.default;

			mapService.map.setStyle(style);

			/* add layers to new map style after delay for aesthetic purposes */
			layerService.layers.forEach(function (layer)
			{
				$timeout(function ()
				{
					mapService.map.addLayer(layer);

					if (layer.layout.visibility === 'visible')
						mapService.map.setLayoutProperty(layer.id, 'visibility', 'visible');

					return true;

				}, 1000);

				return true;
			});

			return true;
		};

	return mapService;
}

mapService.$inject = ['$document', '$http', '$timeout', 'layerService', 'markerService', 'splashScreenService'];

module.exports = mapService;

return true;
})();
