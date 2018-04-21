'use strict';

const resolve = require('path').resolve;

module.exports = {
	mode: 'production',

	entry: resolve('./src/index.js'),

	output: {
		path: resolve('src', 'build')
	},

	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader?optional=runtime&cacheDirectory=true',
				options: {
					presets: ['env']
				}
			}
		}]
	},

	optimization: {
		splitChunks: {
			chunks: 'initial',
			name: 'vendor'
		}
	}
};
