var webpack = require('webpack');

var isDevEnabled = (process.argv.indexOf('-p') < 0) && JSON.parse(process.env.BUILD_DEV || true);
var isLegacy = (process.argv.indexOf('-legacy') > -1); // use Babel to convert to ES5

// Macros for environment builds and debugging
var definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(isDevEnabled),
  'process.env.NODE_ENV': (!isDevEnabled) ? '"production"' : '"dev"'
});

if (isDevEnabled) {
  console.log('WARNING YOU ARE IN DEV MODE');
}

var babelLoader = {
	test: /\.js$/,
	include: /(src)/,
	loader: 'babel',
	query: {
		presets: ['es2015']
	}
}

var loaders = [];
if(isLegacy) {
	loaders.push(babelLoader);
}

var outputFilename = 'ivEventBus';
outputFilename += (!isLegacy) ? '.es6' : '';
outputFilename += (!isDevEnabled) ? '.min' : '';
outputFilename += '.js';

var plugins = [];
plugins.push(definePlugin);

module.exports = {
	entry: './src/ivEventBus.js',
	output: {
		path: 'dist',
		library: 'ivEventBus',
		libraryTarget: 'umd',
		umdNamedDefine: true,
		filename: outputFilename
	},

	module: {
		loaders: loaders
	},

	plugins: plugins,
};
