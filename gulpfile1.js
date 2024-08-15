// packaging less and ts files

// const gulp = require('gulp')
const clean = require('gulp-clean')

const gulp = require('gulp');
const ts = require('gulp-typescript');
const less = require('gulp-less');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const rename = require('gulp-rename');


function cleanFunc(){
    return gulp.src('dist',{ allowEmpty: true, read: false}).pipe(clean())
}

// //清除方式1
// gulp.task('dev',cleanFunc)




// //gulp 可以合并多个任务按顺序执行
// //清除方式2
gulp.task('clean',cleanFunc)
// gulp.task('dev', gulp.series('clean',function(){
//     console.log('清除成功')
// }))

/**
 * gulp 相关打包
 */

// gulp: Gulp 的核心工具。
// gulp-typescript: 用于编译 TypeScript 文件。
// gulp-less: 用于编译 Less 文件。
// gulp-sourcemaps: 用于生成 Source Maps，方便调试。
// gulp-uglify: 用于压缩 JavaScript 文件。
// gulp-clean-css: 用于压缩 CSS 文件（编译后的 Less）。
// gulp-concat: 用于合并多个 JavaScript 文件。
// gulp-rename: 用于重命名文件（如添加 .min 后缀）。
// typescript: TypeScript 编译器，作为 gulp-typescript 的依赖。



// TypeScript 项目
const tsProject = ts.createProject('tsconfig.json');

// TypeScript 任务
gulp.task('scripts', function () {
  return tsProject.src()
    .pipe(sourcemaps.init())                   // 初始化 sourcemaps
    .pipe(tsProject())                         // 编译 TypeScript                
    // .pipe(concat('bundle.js'))                 // 合并所有 JS 文件为 bundle.js
    .pipe(uglify())                            // 压缩 JS
    .pipe(rename({ suffix: '.min' }))          // 重命名为 bundle.min.js
    .pipe(sourcemaps.write('./'))              // 写入 sourcemaps 文件
    .pipe(gulp.dest('dist/js'));               // 输出到 dist/js 目录
});

// Less 任务
gulp.task('styles', function () {
  return gulp.src('src/less/**/*.less')        // 指定要编译的 Less 文件
    .pipe(sourcemaps.init())                   // 初始化 sourcemaps
    .pipe(less())                              // 编译 Less 为 CSS
    .pipe(cleanCSS())                          // 压缩 CSS
    .pipe(rename({ suffix: '.min' }))          // 重命名为 .min.css
    .pipe(sourcemaps.write('./'))              // 写入 sourcemaps 文件
    .pipe(gulp.dest('dist/css'));              // 输出到 dist/css 目录
});

// 默认任务
// gulp.task('default', gulp.parallel('scripts', 'styles'));

gulp.task('watch', function () {
    gulp.watch('src/ts/**/*.ts', gulp.series('scripts'));
    gulp.watch('src/less/**/*.less', gulp.series('styles'));
  });
  
gulp.task('dev', gulp.series('clean','scripts', 'styles', 'watch')); //建议用 series   parallel 并行可能会导致






