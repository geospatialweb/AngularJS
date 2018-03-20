(function () {
'use strict';

var config = {
	DATABASE_URL: 'postgres://postgres:admin@localhost/postgres',
	DATABASE_URL_LOCAL: 'postgres://postgres:admin@localhost/postgres',
    host: '0.0.0.0',
	port: 80
};

module.exports = config;

return true;
})();
