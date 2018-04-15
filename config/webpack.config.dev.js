'use strict';

const resolve = require('path').resolve;

module.exports = {
	devtool: 'eval-source-map',

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
	},

	output: {
		path: resolve('src', 'build')
	}
};
