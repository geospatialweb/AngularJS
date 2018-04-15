'use strict';

import mapboxgl from 'mapbox-gl';

export default class MarkerService
{
	constructor()
	{
		this.markers = [];
		this.markersHash = {};
	}

	createMarkersHash()
	{
		this.markers.map((marker, index) =>
		{
			const element = marker[0].getElement();

			this.markersHash[element.id] = index;
			return true;
		});

		return true;
	}

	setMarkers(data)
	{
		const layer = data.config.params.table;

		switch (layer)
		{
			case 'office': {
				const office = [];

				data.data.features.map(feature =>
				{
					const element = document.createElement('div');

					element.id = layer;
					element.className = `${layer}-marker`;

					office.push(
						new mapboxgl.Marker(element)
							.setLngLat(feature.geometry.coordinates)
							.setPopup(new mapboxgl.Popup({
								offset: 15
							})
								.setHTML(`<b>${feature.properties.name}</b><br>${feature.properties.description}`))
					);

					return true;
				});

				this.markers.push(office);

				break;
			}
			case 'places': {
				const places = [];

				data.data.features.map(feature =>
				{
					const element = document.createElement('div');

					element.id = layer;
					element.className = `${layer}-marker`;

					places.push(
						new mapboxgl.Marker(element)
							.setLngLat(feature.geometry.coordinates)
							.setPopup(new mapboxgl.Popup({
								offset: 15
							})
							.setHTML(`<b>${feature.properties.name}</b><br>${feature.properties.description}`))
					);

					return true;
				});

				this.markers.push(places);

				break;
			}
			case 'trails': {
				const trails = [];

				data.data.features.map(feature =>
				{
					const element = document.createElement('div');

					element.id = layer;
					element.className = `${layer}-marker`;

					trails.push(
						new mapboxgl.Marker(element)
							.setLngLat([feature.properties.lng, feature.properties.lat])
							.setPopup(new mapboxgl.Popup({
								offset: 15
							})
								.setHTML(`<b>${feature.properties.name}</b><br>${feature.properties.description}`))
					);

					return true;
				});

				this.markers.push(trails);

				break;
			}
		}

		return true;
	}
}
