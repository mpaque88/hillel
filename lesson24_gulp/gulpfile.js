const { series, src, dest, watch } = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const inject = require('gulp-inject');

function compileCss() {
    src('src/assets/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('dist/assets'));
}

function concatJs() {
    src('src/script/*.js')
        .pipe(concat('index.js'))
        .pipe(dest('dist/script'));
}

function injectHtml() {
    src('src/index.html')
        .pipe(inject(src(['dist/assets/*.css', 'dist/script/*.js'], { read: false })))
        .pipe(dest('dist/'));
}

function build(cb) {
    compileCss();
    concatJs();
    injectHtml();

    cb();
}

function dev() {
    watch('src/**/*.*', {}, function(cb) {
        compileCss();
        concatJs();
        injectHtml();

        cb();
    })
}

module.exports.build = build;
module.exports.dev = dev;
