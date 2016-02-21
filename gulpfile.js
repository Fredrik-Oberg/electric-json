"use strict";
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var less = require('gulp-less');
var path = require('path');
var debug = require('gulp-debug');
gulp.task('compile-less', function () {
    return gulp.src("./browser/styles/*.less")
    .pipe(debug({title: 'src:'}))
     .pipe(plumber({errorHandler: function (err) {
            console.log(err);
            // And this makes it so "watch" can continue after an error.
            this.emit('end');
        }
        }))
        .pipe(less())
        .pipe(gulp.dest('./browser/styles/'));
});

gulp.task('watch-less', function () {
    gulp.watch('./browser/styles/*.less', ['compile-less']);
});

gulp.task('default', ['watch-less', 'compile-less']);