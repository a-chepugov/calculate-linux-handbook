'use strict';
var gulp = require('gulp');

var ProjectDir = 'public_html';

// Задание по-умолчанию =============================

gulp.task('default',
	['connect'],
	function () {
		gulp.watch(ProjectDir + '/**/*.md', {debounceDelay:500}, markdown);
		gulp.watch(ProjectDir + '/md/**/*.md', ['concat-md']);
		gulp.watch(ProjectDir + '/**/*.html', ['html']);
	});

// Пакетные задания =============================

gulp.task('connect', function() {
	var	connect = require('gulp-connect');

	connect.server({
		root: ProjectDir,
		livereload: true
	});
});

gulp.task('html', function () {
	var src = [ProjectDir + '/**/*.html'];
	var dst = ProjectDir + '/';
	var	connect = require('gulp-connect');

	gulp.src(src)
		.pipe(connect.reload());
});

function markdown(file) {
	var markdown = require('gulp-markdown');
	var dst = ProjectDir + '/html';
	console.log('---> ' + file.path);

	return gulp.src(file.path)
		.pipe(markdown())
		.pipe(gulp.dest(dst))
}


gulp.task('markdown', function () {
	var markdown = require('gulp-markdown');
	var src = [ProjectDir + '/md/**/*.md'];
	var dst = ProjectDir + '/html';

	return gulp.src(src)
		.pipe(markdown())
		.pipe(gulp.dest(dst))
})


gulp.task('concat-md', function() {
	var concat = require('gulp-concat');
	var src = [ProjectDir + '/md/**/*.md'];
	var dst = ProjectDir + '/md';

	return gulp.src(src)
		.pipe(concat('all.md'))
		.pipe(gulp.dest(dst));
});

gulp.task('html2md', function(){
	var html2md = require('gulp-html2md');
	var src = [ProjectDir + '/source/**/*.html'];
	var dst = ProjectDir + '/md';

	gulp.src(src)
		.pipe(html2md())
		// Уточнить установлены ли inline ссылки в модуле!!!
		.pipe(gulp.dest(dst));
});