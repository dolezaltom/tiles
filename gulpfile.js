const gulp = require('gulp');
const gulpIf = require('gulp-if');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const htmlmin = require('gulp-htmlmin');
const cssmin = require('gulp-cssmin');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const jsImport = require('gulp-js-import');
const sourcemaps = require('gulp-sourcemaps');
const htmlPartial = require('gulp-html-partial');
const clean = require('gulp-clean');
const cleanCSS = require('gulp-clean-css');
const phpConnect = require('gulp-connect-php');
const autoprefixer = require('gulp-autoprefixer');
const isProd = process.env.NODE_ENV === 'prod';

var destPath = './dist/';
var assetsPath = './src/assets/';
var scriptsPath = assetsPath+'js/';
var paths = {
    task: {
        styles: [
            assetsPath+'scss/style.scss'
        ],
        scriptsConcat: [
            scriptsPath+'jquery.min.js',
            scriptsPath+'jquery-ui.min.js',
            scriptsPath+'bootstrap.js',
            scriptsPath+'ddslick.js',
            scriptsPath+'index.js'
            
        ]
    }
};

function connectsync() {
    phpConnect.server({
        port: 3000,
        keepalive: true,
        base: destPath
    }, function (){
        browserSync({
            proxy: 'localhost:3000'
        });
    });
}

function php(){
    return gulp.src('src/**/*.php')
        .pipe(gulp.dest(destPath));
}

function data(){
    return gulp.src('src/data.json')
        .pipe(gulp.dest(destPath));
}

function css() {
    return gulp.src(paths.task.styles)
        .pipe(gulpIf(!isProd, sourcemaps.init()))
        .pipe(sass({
            includePaths: ['node_modules']
        }).on('error', sass.logError))
        .pipe(gulpIf(!isProd, sourcemaps.write()))
        .pipe(autoprefixer())
        .pipe(gulpIf(isProd, cleanCSS({compatibility: 'ie8'})))
        .pipe(gulpIf(isProd, cleanCSS({level: {1: {specialComments: 0}}})))
        .pipe(gulp.dest(destPath+'css/'));
}

function js() {
    return gulp.src(paths.task.scriptsConcat)
        .pipe(gulpIf(!isProd, sourcemaps.init()))
        .pipe(jsImport({
            hideConsole: true
        }))
        .pipe(concat('all.js'))
        .pipe(gulpIf(isProd, uglify()))
        .pipe(gulpIf(!isProd, sourcemaps.write()))
        .pipe(gulp.dest(destPath+'js/'));
}

function img() {
    return gulp.src(assetsPath+'img/*')
        .pipe(gulpIf(isProd, imagemin()))
        .pipe(gulp.dest(destPath+'img/'));
}

function del() {
    return gulp.src('dist/*', {read: false})
        .pipe(clean());
}

function browserSyncReload(done) {
    browserSync.reload();
    done();
}

function watchFiles() {
    gulp.watch('src/**/*.php', gulp.series(php, browserSyncReload));
    gulp.watch('src/assets/**/*.scss', gulp.series(css, browserSyncReload));
    gulp.watch('src/assets/**/*.js', gulp.series(js, browserSyncReload));
    gulp.watch('src/**/*.json', gulp.series(data, browserSyncReload));
    gulp.watch('src/img/**/*.*', gulp.series(img, browserSyncReload));
}

exports.css = css;
exports.js = js;
exports.del = del;
exports.serve = gulp.parallel(connectsync, php, css, js, img, data, watchFiles);
exports.default = gulp.parallel(del, php, css, js, img, data);