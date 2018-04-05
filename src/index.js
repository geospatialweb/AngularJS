(function () {
'use strict';

var config = require('./config/config'),
	mapboxgl = require('mapbox-gl');

mapboxgl.accessToken = config.map.accessToken;

require('./modules/modules');

return true;
})();
