(function () {
'use strict';

const join = require('path').join;

const config = {
	entry: [
		join(__dirname, 'public/src/index.js')
	],
	output: {
		filename: 'app.js',
		path: join(__dirname, 'public')
	}
};

module.exports = config;

return true;
})();
