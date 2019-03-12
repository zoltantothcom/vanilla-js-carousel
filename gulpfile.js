var pkg    = require('./package.json'),
	pug      = require('gulp-pug'),
	gulp     = require('gulp'),
	less     = require('gulp-less'),
	clean    = require('gulp-clean-css'),
	uglify   = require('gulp-uglify'),
	rename   = require('gulp-rename'),
	header   = require('gulp-header'),
	jshint   = require('gulp-jshint'),
	stylish  = require('jshint-stylish'),
	browSync = require('browser-sync').create();

var banner = ['/**',
	' * Vanilla Javascript Carousel v<%= pkg.version %>',
	' * <%= pkg.homepage %>',
	' */',
	''].join('\n');

gulp.task('lint', function(done) {
	gulp.src('./src/javascript/*.js')
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter(stylish));

	done();
});

gulp.task('script', gulp.series('lint', function(done) {
	gulp.src(['./src/javascript/vanilla-js-carousel.js'])
		.pipe(uglify())
		.pipe(header(banner, { 
			pkg: pkg 
		}))
		.pipe(rename({ 
			suffix: '.min' 
		}))
		.pipe(gulp.dest('./dist'))
		.pipe(gulp.dest('./docs/javascript'));

	done();
}));

gulp.task('script-live', gulp.series('lint', function(done) {
	gulp.src(['./src/javascript/vanilla-js-carousel.js'])
		.pipe(rename({ 
			suffix: '.min' 
		}))
		.pipe(gulp.dest('./dist'))
		.pipe(browSync.stream());

	done();
}));

gulp.task('markup', function(done) {
	gulp.src('./src/index.pug')
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest('./dist'));

	done();
});

gulp.task('markup-live', function(done) {
	gulp.src('./src/index.pug')
		.pipe(pug())
		.pipe(gulp.dest('./dist'))
		.pipe(browSync.stream());

	done();
});

gulp.task('docs-styles', function(done) {
	gulp.src('./docs/styles/*.less')
		.pipe(less())
		.pipe(clean({ 
			compatibility: 'ie9' 
		}))
		.pipe(gulp.dest('./docs/styles'));

	done();
});

gulp.task('styles', gulp.series('docs-styles', function(done) {
	gulp.src('./src/styles/*.less')
		.pipe(less())
		.pipe(gulp.dest('./dist'))
		.pipe(gulp.dest('./docs/styles'))
		.pipe(browSync.stream());

	done();
}));

gulp.task('styles-live', function(done) {
	gulp.src('./src/styles/*.less')
		.pipe(less())
		.pipe(gulp.dest('./dist'))
		.pipe(browSync.stream());

	done();
});

// static Server + watching less/html files
gulp.task('serve', gulp.series('script-live', 'markup-live', 'styles-live', 'lint', function() {
	browSync.init({
			server: './dist',
			online: false
	});

	gulp.watch('src/styles/*.less', gulp.series('styles'));
	gulp.watch('src/*.pug', gulp.series('markup'));
	gulp.watch('src/javascript/*.js', gulp.series('script'));

	// done();
}));

gulp.task('default', gulp.series('script', 'markup', 'styles', 'docs-styles', 'lint'));
gulp.task('live', gulp.series('serve'));