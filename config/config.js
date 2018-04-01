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
	postgres: {
		DATABASE_URL: 'postgres://postgres:postgres@postgres/postgres',
		DATABASE_URL_LOCAL: 'postgres://postgres:admin@localhost/postgres'
	},
	routes: {
		directory: 'routes',
		layers: '/layers'
	}
};

module.exports = config;

return true;
})();
