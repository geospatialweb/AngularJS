'use strict';

const path = require('path');

const config = {
	entry: [
		path.resolve(__dirname, 'public/src/app.js')
	],
	output: {
		filename: 'app.js',
		path: path.resolve(__dirname, 'public')
	}
};

module.exports = config;
