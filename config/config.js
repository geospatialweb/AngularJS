(function () {
'use strict';

var config = {
	node: {
		host: '0.0.0.0',
		port: 80
	},
	postgres: {
		DATABASE_URL: 'postgres://postgres:postgres@postgres/postgres',
		DATABASE_URL_LOCAL: 'postgres://postgres:admin@localhost/postgres'
	}
};

module.exports = config;

return true;
})();
