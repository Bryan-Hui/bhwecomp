const gulp = require('gulp')
const less = require('gulp-less')
const uglify = require('gulp-uglify')
const souceMaps = require('gulp-sourcemaps')
const cleanCss = require('gulp-clean-css')
const clean = require('gulp-clean')
const flatten  = require('gulp-flatten')
const ts = require('gulp-typescript')
const rename = require('gulp-rename')
const packageJson = require('./package.json')
const path = require('path')
const { read } = require('fs')

const id = packageJson.scripts.dev
const tsProject = ts.createProject('tsconfig.json')



gulp.task(`${id}-clean`, () => {
    return gulp.src('dist',{ allowEmpty: true, read: false}).pipe(clean())
})

/** processing wxs files in the project  */
gulp.task(`${id}-wxs`, () => {
    return gulp.src('**/*.wxs', { cwd: 'src',base: 'src' })
        .pipe(uglify())
        .pipe(flatten())
        .pipe(gulp.dest('dist/wxs')); // output all wxs files to the dist directory
});

gulp.task(`${id}-wxml`, () => {
    return gulp.src('./src/**/*.wxml') 
        .pipe(rename((path) => {
            path.dirname = path.dirname.replace('packages','')
        }))
        .pipe(gulp.dest('dist/')); 
});

gulp.task(`${id}-less`, () => {
    return gulp.src('./src/**/*.less')
        .pipe(less())
        .pipe(rename((path) => {
            path.dirname = path.dirname.replace('packages','')
            path.extname = '.wxss'
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task(`${id}-ts`, function () {
    return tsProject.src()
        .pipe(tsProject())
        .js
        .pipe(rename((path) => {
            path.dirname = path.dirname.replace('packages','')
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task(`${id}-json`, () => {
    return gulp.src('./src/**/*.json') 
        .pipe(rename((path) => {
            path.dirname = path.dirname.replace('packages','')
        }))
        .pipe(gulp.dest('dist/')); 
});

/** package example files */
gulp.task(`${id}-example`, function () {
    return gulp.src('src/example/**/*')  
        // .pipe(rename((path) => {
        //     console.log('path ',path)
        // }))
        .pipe(gulp.dest('dist/example/')); 
});

/** watch file changes */

gulp.task('dev',gulp.series(`${id}-clean`,`${id}-wxs`,`${id}-wxml`,`${id}-less`,`${id}-ts`,`${id}-json`,`${id}-example`))

gulp.task('watch',gulp.series(`${id}-clean`,`${id}-wxs`,`${id}-wxml`,`${id}-less`,`${id}-ts`,`${id}-json`,`${id}-example`))


