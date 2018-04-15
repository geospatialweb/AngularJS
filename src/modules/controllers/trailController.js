'use strict';

import config from '../../config/config';

export default class TrailController
{
	constructor(mapService)
	{
		this.mapService = mapService;
		this.selectedOption = config.trails.selectedOption;
	}

	setTrail($event)
	{
		if ($event)
			$event.stopPropagation();

		switch (this.selectedOption)
		{
			case 'Blue Mountain':
				this.mapService.map.flyTo(config.trails['Blue Mountain']);
				break;

			case 'Charleston Lake':
				this.mapService.map.flyTo(config.trails['Charleston Lake']);
				break;

			case 'Lemoine Point':
				this.mapService.map.flyTo(config.trails['Lemoine Point']);
				break;

			case 'Lyn Valley':
				this.mapService.map.flyTo(config.trails['Lyn Valley']);
				break;

			case 'Mac Johnson':
				this.mapService.map.flyTo(config.trails['Mac Johnson']);
				break;

			case 'Seeley\'s Bay':
				this.mapService.map.flyTo(config.trails['Seeley\'s Bay']);
				break;
		}

		return true;
	}
}

TrailController.$inject = ['mapService'];
