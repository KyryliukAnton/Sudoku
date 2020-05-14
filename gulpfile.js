'use strict';

const gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    brSync = require('browser-sync').create();   // підключаємо плагін browser sync

gulp.task('sass', () => {
    return gulp.src('scss/**/*.scss')
        .pipe(sourcemaps.init())        // активуємо gulp-sourcemaps 
        .pipe(sass({
            outputStyle: 'nested',
        })
            .on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'], 
            cascade: false
        }))
        .pipe(sourcemaps.write())   // створення карти css.map в поточній папці
        .pipe(gulp.dest('css')) 
        .pipe(brSync.reload({ stream: true }))  // перезавантаження сторінки
});     

gulp.task('brSync', () => {
    brSync.init({
        server: {           // локальний сервер
            baseDir: "./" // коренева папка
        },
        notify: true  // відключення сповіщень
    });
});

gulp.task('html', () => {
    return gulp.src('./**/*.html', { since: gulp.lastRun('html') })
        .pipe(brSync.reload({ stream: true }))
});

gulp.task('js', () => {
    return gulp.src('js/**/*.js', { since: gulp.lastRun('js') })
        .pipe(brSync.reload({ stream: true }))
});

gulp.task('watch', gulp.parallel('brSync', () => {
    gulp.watch('scss/**/*.scss', gulp.parallel('sass')); // слідкувати за змінами SASS (SCSS)
    gulp.watch('./*.html', gulp.parallel('html'))     // слідкувати за змінами HTML
    gulp.watch('js/**/*.js', gulp.parallel('js')); // слідкувати за змінами JS  
}));

gulp.task('default', gulp.parallel('sass', 'watch'));  // задача по замовчуванню (gulp)
