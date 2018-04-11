'use strict';

import {config} from '../../config/config';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = config.map.accessToken;

mapService.$inject = ['$http', '$timeout', 'markerService', 'splashScreenService'];

export function mapService($http, $timeout, markerService, splashScreenService)
{
	const mapService = this;

	mapService.layers = [];
	mapService.layersHash = {};
	mapService.mapStyle = config.map.styles.default;

	mapService.map = new mapboxgl.Map({
		container: config.map.container,
		style: mapService.mapStyle,
		center: config.map.center,
		zoom: config.map.zoom
	})
		.addControl(new mapboxgl.NavigationControl(), config.map.control.position)
		.on('styledata', event =>
		{
			if (event.target._loaded && splashScreenService.splashScreen.hasClass('active'))
				splashScreenService.hideSplashScreen();

			return true;
		})
		.on('load', () =>
		{
			$http.get(config.layers.route, {
				params: {
					fields: config.layers.biosphere.postgres.fields,
					table: config.layers.biosphere.postgres.table
				}
			})
				.then(data =>
				{
					if (data && data.data)
					{
						const biosphere = config.layers.biosphere.layer;
						biosphere.source.data = data.data;

						mapService.map.addLayer(biosphere);
						mapService.layers.push(biosphere);

					} else
						console.error('Data Error:\n', data);

                    return true;
				})
				.catch(data => console.error('Query Failed:\n', data));

			$http.get(config.layers.route, {
				params: {
					fields: config.layers.office.postgres.fields,
					table: config.layers.office.postgres.table
				}
			})
				.then(data =>
					data && data.data ?
						markerService.setMarkers(data) :
						console.error('Data Error:\n', data)
				)
				.catch(data => console.error('Query Failed:\n', data));

			$http.get(config.layers.route, {
				params: {
					fields: config.layers.places.postgres.fields,
					table: config.layers.places.postgres.table
				}
			})
				.then(data =>
					data && data.data ?
						markerService.setMarkers(data) :
						console.error('Data Error:\n', data)
				)
				.catch(data => console.error('Query Failed:\n', data));

			$http.get(config.layers.route, {
				params: {
					fields: config.layers.trails.postgres.fields,
					table: config.layers.trails.postgres.table
				}
			})
				.then(data =>
				{
					if (data && data.data)
					{
						const trails = config.layers.trails.layer;
						trails.source.data = data.data;

						mapService.map.addLayer(trails);
						mapService.layers.push(trails);

						markerService.setMarkers(data);

					} else
						console.error('Data Error:\n', data);

					return true;

				})
				.catch(data => console.error('Query Failed:\n', data));

			return true;
		});

		mapService.createLayersHash = () =>
			mapService.layers.map((layer, index) =>
				mapService.layersHash[layer.id] = index
			);

		/* change between 'dark' and 'outdoors' map styles (basemaps) */
		mapService.changeStyle = () =>
		{
			splashScreenService.addSplashScreen();

			mapService.mapStyle === config.map.styles.default ?
				mapService.mapStyle = config.map.styles.outdoors :
				mapService.mapStyle = config.map.styles.default;

			mapService.map.setStyle(mapService.mapStyle);

			/* add layers to new map style after delay for aesthetic purposes */
			mapService.layers.map((layer, index) =>
				$timeout(() =>
				{
					mapService.map.addLayer(layer);

					if (layer.layout.visibility === 'visible')
						mapService.map.setLayoutProperty(layer.id, 'visibility', 'visible');

					if (index === mapService.layers.length - 1)
						splashScreenService.removeSplashScreen();

					return true;

				}, 1000)
			);

			return true;
		};

	return mapService;
}
