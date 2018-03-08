(function () {
'use strict';

function mapController(mapService) {
	trailList.selectedIndex = 0;

	return this;
}

app.controller('mapController', mapController);
mapController.$inject = ['mapService'];

return true;
})();
