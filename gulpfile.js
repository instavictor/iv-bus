var gulp = require('gulp');
var del = require('del');
var exec = require('child_process').exec;
var args = require('yargs').argv;
var gutil = require('gulp-util');

var isProduction = args.env === 'prod';
var isES6Enabled = args.es6;

gulp.task('clean', function(done) {
	del([
		'dist/**/*', 
		'**/.DS_Store'
	]);

	done();
});

gulp.task('build', ['clean'], function(done) {
	var cmd = "webpack";

	// gulp -env prod|dev (default) -
	if (isProduction) {
		cmd += " -p";
	}

	if (!isES6Enabled) {
		cmd += " -legacy";
	}

	// Execute command
	exec(cmd, (err, stdout, stderr) => {
		console.log();
		if (err) {
			console.error(err);
			return;
		}

		console.log(stdout);
		done();
	});
});

/**
	Prints help usage
*/
gulp.task('help', function(done) {
	console.log();
	console.log('  [Usage] ');
	console.log('    Run "gulp" with the these optional flags:');
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
