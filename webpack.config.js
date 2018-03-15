(function () {
'use strict';

const path = require('path');

const config = {
	entry: [
		path.resolve(__dirname, 'public/src/index.js')
	],
	output: {
		filename: 'app.js',
		path: path.resolve(__dirname, 'public')
	}
};

module.exports = config;

return true;
})();
