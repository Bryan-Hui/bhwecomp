const gulp = require('gulp')
const less = require('gulp-less')
const uglify = require('gulp-uglify')
const souceMaps = require('gulp-sourcemaps')
const cleanCss = require('gulp-clean-css')
const clean = require('gulp-clean')
const flatten = require('gulp-flatten')
const ts = require('gulp-typescript')
const rename = require('gulp-rename')
const packageJson = require('./package.json')
const path = require('path')
const { read } = require('fs')

const id = packageJson.name
const tsProject = ts.createProject('tsconfig.json')
const isDev = process.argv[3] && process.argv[3].indexOf('--develop') > -1

gulp.task(`${id}-clean`, () => {
    return gulp.src(isDev ? './src/example/dist' : 'dist', { allowEmpty: true, read: false }).pipe(clean())
})

/** processing wxs files in the project  */
gulp.task(`${id}-wxs`, () => {
    return gulp.src('packages/**/*.wxs', { cwd: 'src', base: 'src' })
        .pipe(uglify())
        // .pipe(flatten())
        .pipe(rename((path) => {
            path.dirname = path.dirname.replace('packages', isDev ? 'example/dist' : '')
        }))
        .pipe(gulp.dest(isDev ? 'src' : 'dist')); // output all wxs files to the dist directory
});

gulp.task(`${id}-wxml`, () => {
    return gulp.src('./src/packages/**/*.wxml')
        .pipe(rename((path) => {
            path.dirname = path.dirname.replace('packages', isDev ? 'example/dist' : '')
        }))
        .pipe(gulp.dest(isDev ? 'src/example/dist' : 'dist'));
});

gulp.task(`${id}-less`, () => {
    return gulp.src('./src/packages/**/*.less')
        .pipe(less())
        .pipe(rename((path) => {
            path.dirname = path.dirname.replace('packages', isDev ? 'example/dist' : '')
            path.extname = '.wxss'
        }))
        .pipe(gulp.dest(isDev ? 'src/example/dist' : 'dist'));
});

gulp.task(`${id}-ts`, function () {
    return tsProject.src()
        .pipe(tsProject())
        .js
        .pipe(rename((path) => {
            path.dirname = path.dirname.replace('packages', isDev ? 'example/dist' : '')
        }))
        .pipe(gulp.dest(isDev ? 'src' : 'dist'));
});

gulp.task(`${id}-json`, () => {
    return gulp.src('./src/packages/**/*.json')
        .pipe(rename((path) => {
            path.dirname = path.dirname.replace('packages', isDev ? 'example/dist' : '')
        }))
        .pipe(gulp.dest(isDev ? 'src/example/dist' : 'dist'));
});

/** package example files */
gulp.task(`${id}-example`, function () {
    return gulp.src('src/example/**/*')
        // .pipe(rename((path) => {
        //     console.log('path ',path)
        // }))
        .pipe(gulp.dest('dist/example'));
});

/** watch file changes */

// gulp.task('dev',gulp.series(`${id}-clean`,`${id}-wxs`,`${id}-wxml`,`${id}-less`,`${id}-ts`,`${id}-json`,`${id}-example`))

// gulp.task('watch',function(){
//     gulp.watch('src/**/*',gulp.series('dev',gulp.parallel(`${id}-wxs`,`${id}-wxml`,`${id}-less`,`${id}-ts`,`${id}-json`,`${id}-example`)));
// })



/** watch wxs file changes*/
gulp.task(`${id}-watch-wxs`, () => {
    return gulp.watch('./src/packages/**/*.wxs', gulp.series(`${id}-wxs`))
})

/** watch wxml file changes*/
gulp.task(`${id}-watch-wxml`, () => {
    return gulp.watch('./src/packages/**/*.wxml', gulp.series(`${id}-wxml`))
})

/** watch wxss file changes*/
gulp.task(`${id}-watch-less`, () => {
    return gulp.watch('./src/packages/**/*.wxss', gulp.series(`${id}-less`))
})

/** watch ts file changes*/
gulp.task(`${id}-watch-ts`, () => {
    return gulp.watch('./src/packages/**/*.ts', gulp.series(`${id}-ts`))
})

/** watch json file changes*/
gulp.task(`${id}-watch-json`, () => {
    return gulp.watch('./src/packages/**/*.json', gulp.series(`${id}-json`))
})

/** watch example file changes*/
gulp.task(`${id}-watch-example`, () => {
    return gulp.watch('./src/example/**/*', gulp.series(`${id}-example`))
})





gulp.task('watch', gulp.series(`${id}-clean`, `${id}-wxs`, `${id}-wxml`, `${id}-less`, `${id}-ts`, `${id}-json`, `${id}-example`, gulp.parallel(`${id}-watch-wxml`, `${id}-watch-less`, `${id}-watch-ts`, `${id}-watch-json`, `${id}-watch-example`)))

gulp.task('dev', gulp.series(`${id}-clean`, `${id}-wxs`, `${id}-wxml`, `${id}-less`, `${id}-ts`, `${id}-json`, gulp.parallel(`${id}-watch-wxml`, `${id}-watch-less`, `${id}-watch-ts`, `${id}-watch-json`, `${id}-watch-wxs`)))

// gulp.task('dev', gulp.series(`${id}-clean`,  `${id}-wxml`, gulp.series(`${id}-watch-wxml`)))