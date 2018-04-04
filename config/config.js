(function () {
'use strict';

var config = {
	sourcecode: 'src',
	favicon: 'images/favicon.ico',
	morgan: {
		flags: 'a',
		format: 'combined',
		logfile: 'logs/access.log'
	},
	node: {
		localhost: '127.0.0.1',
		timeout: 120000,
		HOST: '0.0.0.0',
		PORT: 80
	},
	routes: {
		directory: 'routes',
		layers: '/layers'
	}
};

module.exports = config;

return true;
})();
