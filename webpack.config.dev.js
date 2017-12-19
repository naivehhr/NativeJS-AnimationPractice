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
		library: 'mq',
		libraryTarget: 'umd',
		publicPath: '/assets/'
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
		}),
		new webpack.HotModuleReplacementPlugin()
	],
	devServer: {
		contentBase: './',
		host: "0.0.0.0",
		port: 9001,
    inline: true,
		progress : true,
		colors:true
	}
};