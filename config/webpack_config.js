(function () {
'use strict';

var resolve = require('path').resolve;

var config = {
	entry: resolve('./src/index.js'),

	output: {
		filename: 'app.js',
		path: resolve('./src/dist')
	}
};

module.exports = config;

return true;
})();
