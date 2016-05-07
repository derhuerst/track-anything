'use strict'

const author      = require('parse-author')
const gulp        = require('gulp')
const del         = require('del')
const minifyJS    = require('gulp-uglify')
const minifyCSS   = require('gulp-clean-css')
const frontmatter = require('gulp-front-matter')
const bufferize   = require('vinyl-buffer')
const through     = require('through-gulp')
const minifyHTML  = require('gulp-htmlmin')
const VinylFile   = require('vinyl')

const pkg         = require('./package.json')
const template    = require('./template')

const site = {
	  title:       pkg.name
	, description: pkg.description
	, author:      author(pkg.author).name
}



gulp.task('clean', () => del(['dist/*']))

gulp.task('css', ['clean'], () =>
	gulp.src('src/**/*.css')
	.pipe(minifyCSS())
	.pipe(gulp.dest('dist')))

gulp.task('js', ['clean'], () =>
	gulp.src('src/**/*.js')
	.pipe(minifyJS())
	.pipe(gulp.dest('dist')))

gulp.task('html', ['clean'], () =>
	gulp.src('src/*.html')
	.pipe(frontmatter({property: 'meta', remove: true}))
	.pipe(bufferize()) // template needs the whole content at once
	.pipe(through(function (file, _, done) {
		if (!file.isBuffer()) return done()
		file = file.clone()
		const page = file.meta
		const content = file.contents.toString()
		file.contents = Buffer.from(template(site, page, content))
		this.push(file)
		done()
	}))
	.pipe(minifyHTML())
	.pipe(gulp.dest('dist')))

gulp.task('default', ['clean', 'html', 'css', 'js'])
