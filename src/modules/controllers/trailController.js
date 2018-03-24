(function () {
'use strict';

function trailController(mapService) {
	var trail = this;

	trail.selectedOption = 'Select Trail';

	trail.setTrail = function ($event) {
		if ($event)
			$event.stopPropagation();

		switch (trail.selectedOption) {
			case 'Blue Mountain':
				mapService.map.flyTo({
					center: [-76.04, 44.508],
					zoom: 12
				});

				break;

			case 'Charleston Lake':
				mapService.map.flyTo({
					center: [-76.04, 44.508],
					zoom: 12
				});

				break;

			case 'Lemoine Point':
				mapService.map.flyTo({
					center: [-76.61, 44.223],
					zoom: 14
				});

				break;

			case 'Lyn Valley':
				mapService.map.flyTo({
					center: [-75.75, 44.575],
					zoom: 12
				});

				break;

			case 'Mac Johnson':
				mapService.map.flyTo({
					center: [-75.75, 44.575],
					zoom: 12
				});

				break;

			case 'Seeley\'s Bay':
				mapService.map.flyTo({
					center: [-76.22, 44.485],
					zoom: 13
				});

				break;
		}

		return true;
	};	

	return trail;
}

trailController.$inject = ['mapService'];

module.exports = trailController;

return true;
})();
