var path = require('path');
var version = require('./package.json').version;
var webpack = require('webpack');

module.exports = {
	entry: {
		// animation: './src/animation.js'
		newqueue: './src/workqueue/mdtest.js'
	},
	output: {
		path: __dirname + '/build',
		filename: '[name].js',
		library: 'newqueue',
		libraryTarget: 'umd'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							"es2015",
							"stage-2"
						]
					}
				}
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			__VERSION__: JSON.stringify(version)
		})
	]
};