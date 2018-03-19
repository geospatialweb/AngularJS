(function () {
'use strict';

function mapLayersController(mapService, mapLayerService, mapMarkerService) {
	var layers = this;

	layers.setLayer = function (layer, $event) {
		if ($event)
			$event.stopPropagation();

		switch (layer) {
			case 'biosphere':
				var visibility = mapService.map.getLayoutProperty(layer, 'visibility');

				if (visibility === 'none') {
					mapLayerService.layers[0].children[0].children[0].children[0].className = 'active';
					mapService.map.setLayoutProperty(layer, 'visibility', 'visible');
		
				} else {
					mapLayerService.layers[0].children[0].children[0].children[0].className = '';
					mapService.map.setLayoutProperty(layer, 'visibility', 'none');
				}

				break;

			case 'office':
				if (mapLayerService.layers[0].children[0].children[1].children[0].className === '')
					mapLayerService.layers[0].children[0].children[1].children[0].className = 'active';

				else
					mapLayerService.layers[0].children[0].children[1].children[0].className = '';

				mapMarkerService.office.forEach(function (office) {
					var el = office.getElement();

					if (el.hidden)
						office.addTo(mapService.map);

					else
						office.remove();
		
					el.hidden = !el.hidden;

					return true;
				});

				break;

			case 'places':
				if (mapLayerService.layers[0].children[0].children[2].children[0].className === '')
					mapLayerService.layers[0].children[0].children[2].children[0].className = 'active';

				else
					mapLayerService.layers[0].children[0].children[2].children[0].className = '';

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
					mapLayerService.layers[0].children[0].children[3].children[0].className = 'active';
					mapService.map.setLayoutProperty(layer, 'visibility', 'visible');
		
				} else {
					mapLayerService.layers[0].children[0].children[3].children[0].className = '';
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
				if (mapLayerService.basemap === 0) {
					mapLayerService.layers[0].children[0].children[4].children[0].className = 'active';
					mapLayerService.basemap = 1;

					mapService.map.setStyle('mapbox://styles/mapbox/satellite-v9');
		
				} else {
					mapLayerService.layers[0].children[0].children[4].children[0].className = '';
					mapLayerService.basemap = 0;

					mapService.map.setStyle('mapbox://styles/mapbox/dark-v9');
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

mapLayersController.$inject = ['mapService', 'mapLayerService', 'mapMarkerService'];

module.exports = mapLayersController;

return true;
})();
