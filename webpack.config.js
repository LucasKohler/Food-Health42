const devMode = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
	mode: devMode ? 'development' : 'production',
	entry: './src/js/app.js',
	output: {
		filename: 'main.js',
		path: __dirname + '/public',
	},
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				cache: true,
				parallel: true,
			}),
			new OptimizeCSSAssetsPlugin({}),
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'style.css',
		}),
	],
	module: {
		rules: [
			{
				test: /\.s?[ac]ss$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: { presets: ['@babel/preset-env'] },
				},
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: 'images',
						},
					},
				],
			},
		],
	},
};
