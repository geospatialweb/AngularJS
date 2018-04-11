'use strict';

import {config} from '../../config/config';

layerController.$inject = ['$document', '$timeout', '$window', 'displayMarkerService', 'mapService', 'markerService'];

export function layerController($document, $timeout, $window, displayMarkerService, mapService, markerService)
{
	const layers = this;

	layers.setLayer = (layer, $event) =>
	{
		if ($event)
			$event.stopPropagation();

		if (angular.equals(mapService.layersHash, {}) && angular.equals(markerService.markersHash, {}))
		{
			mapService.createLayersHash();
			markerService.createMarkersHash();
		}

		const element = angular.element($document[0].querySelectorAll(`map-layer ul.layers li.${layer} div`));

		element.hasClass('active') ? element.removeClass('active') : element.addClass('active');

		if (layer === 'terrain')
		{
			/* change between 'dark' and 'outdoors' map styles (basemaps) */
			mapService.changeStyle();

			/* hide active markers when changing map styles for aesthetic purposes */
			displayMarkerService.hideMarkers();

			/* show active markers after changing map styles for aesthetic purposes */
			mapService.mapStyle === config.map.styles.default ?
				$timeout(() => displayMarkerService.showMarkers(), 1250) :
				$timeout(() => displayMarkerService.showMarkers(), 1500);

		} else if (layer === 'biosphere' || layer === 'trails')
		{
			if (element.hasClass('active'))
			{				
				mapService.map.setLayoutProperty(layer, 'visibility', 'visible');
				mapService.layers[mapService.layersHash[layer]].layout.visibility = 'visible';

				if (layer === 'trails')
					displayMarkerService.addMarkers(layer);

			} else
			{
				mapService.map.setLayoutProperty(layer, 'visibility', 'none');
				mapService.layers[mapService.layersHash[layer]].layout.visibility = 'none';

				if (layer === 'trails')
					displayMarkerService.removeMarkers(layer);
			}

		} else if (layer === 'office' || layer === 'places')
		{
			element.hasClass('active') ?
				displayMarkerService.addMarkers(layer) :
				displayMarkerService.removeMarkers(layer);

		} else if (layer === 'resetMap')
			$window.location.reload(true);

		return true;
	};

	return layers;
}
