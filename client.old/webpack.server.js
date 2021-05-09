const path =require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const webpackNodeExternals = require('webpack-node-externals');



const config = {
	// inform webpack we r building a bundle 
	// for nodejs, rather than for the browser
	target: 'node',

	// tell webpack the root file of our app
	entry: './src/index.js',

	// tell webpack where to put the output file generated
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'build')
	},
	// tell webpack to do not import the lib modules inside the bundle
	externals: [webpackNodeExternals()]
};

module.exports = merge(baseConfig, config);

