var gulp           = require('gulp'),
    concat         = require('gulp-concat'),
    uglify         = require('gulp-uglify'),
    browserSync    = require('browser-sync');


gulp.task('scripts', ['modernizr'], function() {
	return gulp.src([
    'app/js/Vendor.js',
		'app/js/App.js' // Всегда в конце
		])
	.pipe(concat('scripts.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({stream: true}));
});
