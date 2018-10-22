const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');



module.exports = {
	entry: {
		main: './src/index.js',
	},
	output: {
		filename: '[name].[hash].js',
		path: path.resolve('./dist'),
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: ['node_modules'],
				use: [
				{ 
					loader: 'babel-loader',
						query: {
							presets: ['react', 'babel-preset-stage-2'] 
						}
					}
				]
			},
			{
				test: /\.s(a|c)ss$/,
				use: [{
					loader: 'style-loader'
				}, {
					loader: 'css-loader'
				}, {
					loader: 'sass-loader'
				}],
			}
		]
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: 'index.html'
		}),
		new CleanWebpackPlugin(['dist'])
		]
}