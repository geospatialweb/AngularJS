(function () {
'use strict';

var resolve = require('path').resolve;

var config = {
	entry: './src/index.js',

	output: {
		filename: 'app.js',
		path: resolve(process.cwd(), 'src/dist')
	}
};

module.exports = config;

return true;
})();
