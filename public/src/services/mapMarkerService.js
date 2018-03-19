(function () {
'use strict';

function mapMarkerService() {
	var mapMarkerService = this;

	mapMarkerService.office = null;
	mapMarkerService.places = [];
	mapMarkerService.trails = [];

	return mapMarkerService;
}

module.exports = mapMarkerService;

return true;
})();
