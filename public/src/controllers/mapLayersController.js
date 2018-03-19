(function () {
'use strict';

function mapLayersController(mapMarkerService, mapService) {
	var layers = this;

	layers.setLayer = function (layer, $event) {
		if ($event)
			$event.stopPropagation();

		switch (layer) {
			case 'biosphere':
				var visibility = mapService.map.getLayoutProperty(layer, 'visibility');

				if (visibility === 'none') {
					mapService.mapLayers[0].children[0].children[0].children[0].className = 'active';
					mapService.map.setLayoutProperty(layer, 'visibility', 'visible');
		
				} else {
					mapService.mapLayers[0].children[0].children[0].children[0].className = '';
					mapService.map.setLayoutProperty(layer, 'visibility', 'none');
				}

				break;

			case 'office':
				var el = mapMarkerService.office.getElement();
	
				if (el.hidden) {
					mapService.mapLayers[0].children[0].children[1].children[0].className = 'active';
					mapMarkerService.office.addTo(mapService.map);
		
				} else {
					mapService.mapLayers[0].children[0].children[1].children[0].className = '';
					mapMarkerService.office.remove();
				}
		
				el.hidden = !el.hidden;

				break;

			case 'places':
				if (mapService.mapLayers[0].children[0].children[2].children[0].className === '')
					mapService.mapLayers[0].children[0].children[2].children[0].className = 'active';

				else
					mapService.mapLayers[0].children[0].children[2].children[0].className = '';

				mapMarkerService.places.forEach(function (place) {
					var el = place.getElement();

					if (el.hidden)
						place.addTo(mapService.map);

					else
						place.remove();

					el.hidden = !el.hidden;

					return true;
				});

				break;

			case 'trails':
				var visibility = mapService.map.getLayoutProperty(layer, 'visibility');
		
				if (visibility === 'none') {
					mapService.mapLayers[0].children[0].children[3].children[0].className = 'active';
					mapService.map.setLayoutProperty(layer, 'visibility', 'visible');
		
				} else {
					mapService.mapLayers[0].children[0].children[3].children[0].className = '';
					mapService.map.setLayoutProperty(layer, 'visibility', 'none');
				}
		
				mapMarkerService.trails.forEach(function (trail) {
					var el = trail.getElement();
		
					if (el.hidden)
						trail.addTo(mapService.map);
		
					else
						trail.remove();
		
					el.hidden = !el.hidden;
		
					return true;
				});

				break;
/*
			case 'aerialView':
				if (mapService.basemap === 0) {
					mapService.mapLayers[0].children[0].children[4].children[0].className = 'active';
					mapService.map.setStyle('mapbox://styles/mapbox/satellite-v9');
					mapService.basemap = 1;
		
				} else {
					mapService.mapLayers[0].children[0].children[4].children[0].className = '';
					mapService.map.setStyle('mapbox://styles/mapbox/dark-v9');
					mapService.basemap = 0;
				}

				break;
*/
			case 'resetMap':
				location.reload(true);
				break;
		}

		return true;
	};	

	return layers;
}

mapLayersController.$inject = ['mapMarkerService', 'mapService'];

module.exports = mapLayersController;

return true;
})();
