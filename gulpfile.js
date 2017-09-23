var gulp = require('gulp');
var del = require('del');
var execSync = require('child_process').execSync;
var args = require('yargs').argv;

var isProduction = args.env === 'prod';
var isES6Enabled = args.es6;

gulp.task('clean', function(done) {
	var func = function paths() {
		done();
	};

	clean(func);
});

function clean(done) {
	del([
		'dist/**/*', 
		'**/.DS_Store'
	]).then(done);
};

gulp.task('build', ['clean'], function(done) {
	var cmd = "webpack";

	if (isProduction) {
		cmd += " -p";
	}

	if (!isES6Enabled) {
		cmd += " -legacy";
	}

	runCmd(cmd, done);
});

gulp.task('build:all', function(done) {
	var cmd = "webpack";

	var run = function paths() {
		runCmd(cmd + ' -p -legacy');
		runCmd(cmd + ' -legacy'); 

		// Note: es6 uglify unsupported at the moment
		runCmd(cmd);
		done();
	};

	clean(run);
});


gulp.task('test', function(done) {
	// var cmd = "mocha --compilers js:babel-register -b";
	var cmd = "cross-env NODE_ENV=test nyc --reporter=text --reporter=html mocha";
	// var cmd = "cross-env NODE_ENV=test nyc --reporter= mocha";
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
	console.log('    build:all : runs standard build (dev flag enabled / es6 disabled)');
	console.log();
	console.log('  [Flags]');
	console.log('    --es6 disables es5 transpiling');
	console.log('    --env specifies the environment (prod | dev (default) ');
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
var runCmd = function(cmd, done) {
	execSync(cmd, {stdio:'inherit'});
	if (done) {
		done();
	}
};
