(function () {
'use strict';

function layerController($document, $timeout, $window, displayMarkerService, layerService, mapService)
{
	var layers = this;

	layers.setLayer = function (layer, $event)
	{
		if ($event)
			$event.stopPropagation();

		if (angular.equals(layerService.layersHash, {}))
			layerService.createHash();

		var el = angular.element($document[0].querySelectorAll('map-layer ul.layers li.' + layer + ' div'));

		if (!el.hasClass('active'))
			el.addClass('active');

		else
			el.removeClass('active');

		if (layer === 'terrain')
		{
			/* toggle 'dark' and 'outdoors' map styles (basemaps) */
			mapService.setStyle();

			/* hide active markers when toggling map styles for aesthetic purposes */
			displayMarkerService.hideMarkers();

			/* show active markers after toggling map styles for aesthetic purposes */
			$timeout(function ()
			{
				displayMarkerService.showMarkers();
				return true;

			},1200);

		} else if (layer === 'biosphere' || layer === 'trails')
		{
			if (el.hasClass('active'))
			{				
				mapService.map.setLayoutProperty(layer, 'visibility', 'visible');
				layerService.layers[layerService.layersHash[layer]].layout.visibility = 'visible';

				if (layer === 'trails')
					displayMarkerService.addMarkers(layer);

			} else
			{
				mapService.map.setLayoutProperty(layer, 'visibility', 'none');
				layerService.layers[layerService.layersHash[layer]].layout.visibility = 'none';

				if (layer === 'trails')
					displayMarkerService.removeMarkers(layer);
			}

		} else if (layer === 'office' || layer === 'places')
		{
			if (el.hasClass('active'))
				displayMarkerService.addMarkers(layer);

			else
				displayMarkerService.removeMarkers(layer);

		} else if (layer === 'resetMap')
			$window.location.reload(true);

		return true;
	};

	return layers;
}

layerController.$inject = ['$document', '$timeout', '$window', 'displayMarkerService', 'layerService', 'mapService'];

module.exports = layerController;

return true;
})();
