'use strict';

module.exports = {
	favicon: 'images/favicon.ico',
	morgan: {
		flags: 'a',
		format: 'common',
		logfile: 'logs/access.log'
	},
	routes: {
		layers: 'layers'
	}
};
