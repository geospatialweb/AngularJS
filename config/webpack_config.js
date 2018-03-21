(function () {
'use strict';

var join = require('path').join;

var config = {
	entry: './src/index.js',

	output: {
		filename: 'app.js',
		path: join(__dirname, '../src/dist')
	}
};

module.exports = config;

return true;
})();
