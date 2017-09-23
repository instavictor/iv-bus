var gulp = require('gulp');
var del = require('del');
var execSync = require('child_process').execSync;
var args = require('yargs').argv;

var isProduction = args.env === 'prod';
var isES6Enabled = args.es6;

gulp.task('clean', function(done) {
	var func = function() {
		done();
	};

	clean(func);
});

gulp.task('build', ['clean'], function(done) {
	var cmd = 'webpack';

	if (isProduction) {
		cmd += ' -p';
	}

	if (!isES6Enabled) {
		cmd += ' -legacy';
	}

	runCmd(cmd, done);
});

gulp.task('build:all', ['clean'], function(done) {
	var cmd = 'webpack';

	runCmd(cmd + ' -p -legacy');
	runCmd(cmd + ' -legacy'); 

	// Note: es6 uglify unsupported at the moment
	runCmd(cmd);
	done();
});

gulp.task('dist', function(done) {
	runCmd('gulp build:all');
	runCmd('gulp test');
	done();
});

gulp.task('test', function(done) {
	var cmd = "cross-env NODE_ENV=test nyc --reporter=text --reporter=html mocha";
	runCmd(cmd, done);
});

/**
	Prints help usage
*/
gulp.task('help', function(done) {
	console.log();
	console.log('  [Usage] ');
	console.log('    gulp [task] [FLAGS]');
	console.log();
	console.log('  [Tasks] ');
	console.log('    help : displays this help');
	console.log('    test : runs mocha test suite');
	console.log('    build : runs standard build (dev flag enabled / es6 disabled)');
	console.log('    build:all : runs builds for es5 minified, es5 unminified, and es6 debug unminified');
	console.log();
	console.log('  [Flags] ONLY usable for build task');
	console.log('    --es6 disables es5 transpiling');
	console.log('    --env specifies the environment (prod | dev (default)) ');
	console.log();
	console.log('  [Example]');
	console.log('    gulp --env=prod --es6');
	console.log();

	done();
});

gulp.task('default', ['build'], function(done) {
	done();
});

/**********************
	Helper functions
***********************/
var runCmd = function runCmd(cmd, done) {
	execSync(cmd, {stdio:'inherit'});
	if (done) {
		done();
	}
};

var clean = function clean(done) {
	del([
		'dist/**/*', 
		'**/.DS_Store',
		'coverage',
		'.nyc_output'
	]).then(done);
};
