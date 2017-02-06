const gulp = require('gulp');

const sceg = require('./');

gulp.task('plugin-test', () => {
	gulp
		.src('./test/el/**/*')
		.pipe(sceg({
			layout: './test/layout/index.hbs',
			data: {
				TITLE: 'title from custom data',
			},
		}))
		.pipe(gulp.dest('./test/dest'));
});

gulp.task('plugin-test-json', () => {
	gulp
		.src('./test/el/**/*')
		.pipe(sceg({
			filename: 'json.json',
			type: 'json',
		}))
		.pipe(gulp.dest('./test/dest/json/'));
});
