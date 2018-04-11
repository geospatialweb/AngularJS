'use strict';

import {config} from '../../config/config';

export function trailController(mapService)
{
	const trails = this;

	trails.selectedOption = config.trails.selectedOption;

	trails.setTrail = $event =>
	{
		if ($event)
			$event.stopPropagation();

		switch (trails.selectedOption)
		{
			case 'Blue Mountain':
				mapService.map.flyTo(config.trails.Blue_Mountain);
				break;

			case 'Charleston Lake':
				mapService.map.flyTo(config.trails.Charleston_Lake);
				break;

			case 'Lemoine Point':
				mapService.map.flyTo(config.trails.Lemoine_Point);
				break;

			case 'Lyn Valley':
				mapService.map.flyTo(config.trails.Lyn_Valley);
				break;

			case 'Mac Johnson':
				mapService.map.flyTo(config.trails.Mac_Johnson);
				break;

			case 'Seeley\'s Bay':
				mapService.map.flyTo(config.trails.Seeleys_Bay);
				break;
		}

		return true;
	};	

	return trails;
}
