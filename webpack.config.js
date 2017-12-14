module.exports = {
	entry: {
		// animation: './src/animation.js'
		person: './src/doclass/person.js'
	},
	// output: {
	// 	path: __dirname + '/build',
	// 	filename: '[name].js',
	// 	library: 'animation', // 会在window上对策一个animation对象
	// 	libraryTarget: 'umd', // 支持AMD CMD等
	// }
	output: {
		path: __dirname + '/build',
		filename: '[name]webpack.js',
		library: 'person', // 会在window上对策一个animation对象
		libraryTarget: 'umd', // 支持AMD CMD等
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					// 这里和在.babelrc中定义效果是一样的
					// options: {
					// 	presets: [
					// 		"env",
					// 		"stage-2"
					// 	]
					// }
				}
			}
		]
	}
}