var gulp = require('gulp'),
	gulpif = require('gulp-if'),
	uglify = require('gulp-uglify'),
	less = require('gulp-less'),
	minifyCss = require('gulp-minify-css'),
	useref = require('gulp-useref'),
	watch = require('gulp-watch'),
	server = require('gulp-server-livereload');

gulp.task('less', function() {
	return gulp.src('src/less/**/*.less')
			.pipe(less())
			.pipe(gulp.dest('src/css/'));
});

gulp.task('bundle', function() {
	var assets = useref.assets();
	return gulp.src('src/*.html')
			.pipe(assets)
			.pipe(gulpif('*.js', uglify()))
			.pipe(gulpif('*.css', minifyCss()))
			.pipe(assets.restore())
			.pipe(useref())
			.pipe(gulp.dest('build'));
});

gulp.task('watch', function() {
	gulp.watch('src/**/*.less', function() {
		gulp.start('less');
	});
	gulp.watch(['src/**/*.js', 'src/**/*.css', 'src/**/*.html'], function() {
		gulp.start('bundle');
	});
});

gulp.task('server', function() {
	gulp.src('build')
			.pipe(server({
				livereload: true,
				open: true,
				defaultFile: 'index.html'
			}));
});