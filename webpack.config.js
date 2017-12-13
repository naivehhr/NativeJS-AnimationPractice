module.exports = {
	entry: {
		animation: './src/animation.js'
	},
	output: {
		path: __dirname + '/build',
		filename: '[name].js',
		library: 'animation', // 会在window上对策一个animation对象
		libraryTarget: 'umd', // 支持AMD CMD等
	}
}