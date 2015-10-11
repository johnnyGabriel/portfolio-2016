var gulp = require('gulp'),
	gulpif = require('gulp-if'),
	uglify = require('gulp-uglify'),
	minifyCss = require('gulp-minify-css'),
	useref = require('gulp-useref'),
	watch = require('gulp-watch'),
	server = require('gulp-server-livereload');

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
	gulp.watch(['src/**/*.*'], function() {
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