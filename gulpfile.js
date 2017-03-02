var pkg      = require('./package.json'),
	pug      = require('gulp-pug'),
	gulp     = require('gulp'),
	less     = require('gulp-less'),
	strip    = require('gulp-strip-code'),
	clean    = require('gulp-clean-css'),
	uglify   = require('gulp-uglify'),
	rename   = require('gulp-rename'),
	header   = require('gulp-header'),
	jshint   = require('gulp-jshint'),
	stylish  = require('jshint-stylish');

var banner = ['/**',
	' * Vanilla Javascript Carousel v<%= pkg.version %>',
	' * <%= pkg.homepage %>',
	' */',
	''].join('\n');

gulp.task('script', function() {
	gulp.src(['./src/javascript/carousel.js'])
		.pipe(strip({
			start_comment: 'start-test-block',
			end_comment: 'end-test-block'
		}))
		.pipe(uglify())
		.pipe(header(banner, { 
			pkg: pkg 
		}))
		.pipe(rename({ 
			suffix: '.min' 
		}))
		.pipe(gulp.dest('./dist'));
});

gulp.task('markup', function() {
	gulp.src('./src/index.pug')
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest('./dist'));
});

gulp.task('styles', function() {
	gulp.src('./src/styles/*.less')
		.pipe(less())
		// .pipe(clean({ 
		// 	compatibility: 'ie9' 
		// }))
		// .pipe(rename({ 
		// 	suffix: '.min' 
		// }))
		.pipe(gulp.dest('./dist'));
});

gulp.task('lint', function() {
	return gulp.src('./src/*.js')
		.pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter(stylish));
});

gulp.task('default', [ 'script', 'markup', 'styles', 'lint' ]);