'use strict';

import config from '../../config/config';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = config.map.accessToken;

export default class MapService
{
	constructor($http, $timeout, markerService, splashScreenService)
	{
		this.$http = $http;
		this.$timeout = $timeout;
		this.markerService = markerService;
		this.splashScreenService = splashScreenService;

		this.layers = [];
		this.layersHash = {};
		this.mapStyle = config.map.styles.default;

		this.map = new mapboxgl.Map({
			container: config.map.container,
			style: this.mapStyle,
			center: config.map.center,
			zoom: config.map.zoom
		})
			.addControl(new mapboxgl.NavigationControl(), config.map.control.position)
			.on('styledata', event =>
			{
				if (event.target._loaded && this.splashScreenService.splashScreen.hasClass('active'))
					this.splashScreenService.hideSplashScreen();

				return true;
			})
			.on('load', () =>
			{
				this.$http.get(config.layers.route, {
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

							this.map.addLayer(biosphere);
							this.layers.push(biosphere);

						} else
							console.error('Data Error:\n', data);

						return true;
					})
					.catch(data => console.error('Query Failed:\n', data));

				this.$http.get(config.layers.route, {
					params: {
						fields: config.layers.office.postgres.fields,
						table: config.layers.office.postgres.table
					}
				})
					.then(data =>
						data && data.data ?
							this.markerService.setMarkers(data) :
							console.error('Data Error:\n', data)
					)
					.catch(data => console.error('Query Failed:\n', data));

				this.$http.get(config.layers.route, {
					params: {
						fields: config.layers.places.postgres.fields,
						table: config.layers.places.postgres.table
					}
				})
					.then(data =>
						data && data.data ?
							this.markerService.setMarkers(data) :
							console.error('Data Error:\n', data)
					)
					.catch(data => console.error('Query Failed:\n', data));

				this.$http.get(config.layers.route, {
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

							this.map.addLayer(trails);
							this.layers.push(trails);

							this.markerService.setMarkers(data);

						} else
							console.error('Data Error:\n', data);

						return true;

					})
					.catch(data => console.error('Query Failed:\n', data));

				return true;
			});
	}

	createLayersHash()
	{
		this.layers.map((layer, index) =>
			this.layersHash[layer.id] = index
		);

		return true;
	}

	/* change between 'dark' and 'outdoors' map styles (basemaps) */
	changeStyle()
	{
		this.splashScreenService.addSplashScreen();

		this.mapStyle === config.map.styles.default ?
			this.mapStyle = config.map.styles.outdoors :
			this.mapStyle = config.map.styles.default;

		this.map.setStyle(this.mapStyle);

		/* add layers to new map style after delay for aesthetic purposes */
		this.layers.map((layer, index) =>
			this.$timeout(() =>
			{
				this.map.addLayer(layer);

				if (layer.layout.visibility === 'visible')
					this.map.setLayoutProperty(layer.id, 'visibility', 'visible');

				if (index === this.layers.length - 1)
					this.splashScreenService.removeSplashScreen();

				return true;

			}, 1000)
		);

		return true;
	}
}

MapService.$inject = ['$http', '$timeout', 'markerService', 'splashScreenService'];
