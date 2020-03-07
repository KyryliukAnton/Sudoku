'use strict';

const gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    brSync = require('browser-sync').create();   // подключаем плагин browser sync

gulp.task('sass', () => {
    return gulp.src('scss/**/*.scss')
        .pipe(sourcemaps.init())        // активируем gulp-sourcemaps 
        .pipe(sass({
            outputStyle: 'nested',
        })
            .on('error', sass.logError))
        .pipe(sourcemaps.write())   // создание карты css.map в текущей папке 
        .pipe(gulp.dest('css')) 
        .pipe(brSync.reload({ stream: true }))  // обновление (перезагрузка) страницы
});

gulp.task('brSync', () => {
    brSync.init({
        server: {           // локальный сервер
            baseDir: "./" // корневая папка
        },
        notify: true  // отклчение уведомлений
    });
});

gulp.task('html', () => {
    return gulp.src('./**/*.html', { since: gulp.lastRun('html') })
        .pipe(brSync.reload({ stream: true }))
});

gulp.task('watch', gulp.parallel('brSync', () => {
    gulp.watch('scss/**/*.scss', gulp.parallel('sass')); // следим за изменениями SASS
    gulp.watch('./*.html', gulp.parallel('html'))     // следим за изменениями HTML  
}));

gulp.task('default', gulp.parallel('sass', 'watch'));  // задача по умолчанию (gulp)
