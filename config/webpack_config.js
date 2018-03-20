(function () {
'use strict';

const join = require('path').join;

const config = {
	entry: './public/index.js',

	output: {
		filename: 'app.js',
		path: join(__dirname, '../public/dist')
	}
};

module.exports = config;

return true;
})();
