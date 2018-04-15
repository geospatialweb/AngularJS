'use strict';

import config from '../../config/config';

export default class LayerController
{
	constructor($document, $timeout, $window, displayMarkerService, mapService, markerService)
	{
		this.$document = $document;
		this.$timeout = $timeout;
		this.$window = $window;
		this.displayMarkerService = displayMarkerService;
		this.mapService = mapService;
		this.markerService = markerService;
	}

	setLayer(layer, $event)
	{
		if ($event)
			$event.stopPropagation();

		if (angular.equals(this.mapService.layersHash, {}) && angular.equals(this.markerService.markersHash, {}))
		{
			this.mapService.createLayersHash();
			this.markerService.createMarkersHash();
		}

		const element = angular.element(this.$document[0].querySelectorAll(`map-layer ul.layers li.${layer} div`));

		element.hasClass('active') ? element.removeClass('active') : element.addClass('active');

		if (layer === 'terrain')
		{
			/* change between 'dark' and 'outdoors' map styles (basemaps) */
			this.mapService.changeStyle();

			/* hide active markers when changing map styles for aesthetic purposes */
			this.displayMarkerService.hideMarkers();

			/* show active markers after changing map styles for aesthetic purposes */
			this.mapService.mapStyle === config.map.styles.default ?
				this.$timeout(() => this.displayMarkerService.showMarkers(), 1250) :
				this.$timeout(() => this.displayMarkerService.showMarkers(), 1500);

		} else if (layer === 'biosphere' || layer === 'trails')
		{
			if (element.hasClass('active'))
			{				
				this.mapService.map.setLayoutProperty(layer, 'visibility', 'visible');
				this.mapService.layers[this.mapService.layersHash[layer]].layout.visibility = 'visible';

				if (layer === 'trails')
					this.displayMarkerService.addMarkers(layer);

			} else
			{
				this.mapService.map.setLayoutProperty(layer, 'visibility', 'none');
				this.mapService.layers[this.mapService.layersHash[layer]].layout.visibility = 'none';

				if (layer === 'trails')
					this.displayMarkerService.removeMarkers(layer);
			}

		} else if (layer === 'office' || layer === 'places')
		{
			element.hasClass('active') ?
				this.displayMarkerService.addMarkers(layer) :
				this.displayMarkerService.removeMarkers(layer);

		} else if (layer === 'resetMap')
			this.$window.location.reload(true);

		return true;
	}
}

LayerController.$inject = ['$document', '$timeout', '$window', 'displayMarkerService', 'mapService', 'markerService'];
