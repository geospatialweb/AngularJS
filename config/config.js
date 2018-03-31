(function () {
'use strict';

var config = {
	sourcecode: 'src',
	favicon: 'src/images/favicon.ico',
	logfile: './logs/access.log',
	timeout: 300000,
	node: {
		HOST: '0.0.0.0',
		PORT: 80
	},
	postgres: {
		DATABASE_URL: 'postgres://postgres:postgres@postgres/postgres',
		DATABASE_URL_LOCAL: 'postgres://postgres:admin@localhost/postgres'
	},
	routes: {
		layers: '/layers'
	}
};

module.exports = config;

return true;
})();
