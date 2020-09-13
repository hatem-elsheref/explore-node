const gulp = require('gulp');
const imageMin = require('gulp-imagemin');
const image = require('gulp-image');
const javascript = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const css = require('gulp-clean-css');
const rename = require('gulp-rename');
const order = require('gulp-order');
/*
 *                  ######## Top Level Functions ###########
 *   gulp.task  to make new task to perform some process
 *   gulp.src select the source of files and folder to use it or to make process to it
 *   gulp.dest   select the destination folder or file to save your outputs
 *   gulp.watch  watch files and folders if there any changes happened
 *   gulp.pipe take function name (any package you install it to perform some operation)
 *   gulp.series perform more task in series mode
 *  gulp.parallel perform or run more task in parallel mode
 *  default is the name of the task run => <gulp>  this command will execute the default task but you should prepare it first
 * */
gulp.task('run-html', (done) => {
    gulp.src('src/*.html').
    pipe(gulp.dest('assets/'));
    done();
});
gulp.task('run-image-min', (done) => {
    gulp.src('src/images/*.*').
    pipe(imageMin()).
    pipe(gulp.dest('assets/images-min'));
    done();
});
gulp.task('run-image', (done) => {
    gulp.src('src/images/*.*').
    pipe(image()).
    pipe(gulp.dest('assets/images-image'));
    done();
});
gulp.task('run-js', (done) => {
    gulp.src('src/js/*.js').
    pipe(javascript()).
    pipe(gulp.dest('assets/js'));
    done();
});
gulp.task('run-scss', (done) => {
    gulp.src('src/sass/*.scss').
    pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError, )).
    pipe(gulp.dest('assets/css'));
    done();
});
gulp.task('run-css', (done) => {
    gulp.src('src/css/*.css').
    pipe(css({ outputStyle: 'compressed' }).on('error', sass.logError, )).
    pipe(concat('app.css')).
    pipe(gulp.dest('assets/css'));
    done();
});
gulp.task('run-concat', (done) => {
    gulp.src('src/js/*.js').
    pipe(order(
        [
            'file4.js',
            'file4.js',
            'file2.js',
            'file3.js'
        ]
    )).
    pipe(concat('app.js')).
    pipe(javascript()).
    pipe(rename({ suffix: '.min' })).
    pipe(gulp.dest('assets/js'));
    done();
});
gulp.task('run-rename', (done) => {
    gulp.src('src/js/*.js').
    pipe(javascript()).
    pipe(rename({ suffix: '.min' })).
    pipe(gulp.dest('assets/js'));
    done();
});
gulp.task('watch', (done) => {
    gulp.watch('src/*.html', gulp.series('run-html'));
    gulp.watch('src/js/*', gulp.series('run-js'));
    gulp.watch('src/images/*', gulp.series('run-image'));
    gulp.watch('src/images/*', gulp.series('run-image-min'));
    gulp.watch('src/sass/*', gulp.series('run-scss'));
    done();
});
gulp.task('default', gulp.series('run-html', 'run-image', 'run-image-min', 'run-js', 'run-scss'));

// gulp.task('run',gulp.src('src/*.scss').pipe(sass({outputStyle: 'compressed'}).on('error',sass.logError,)).pipe(gulp.dest('src/app.css')));
gulp.task('run', () => {
    return gulp.src('src/sass/*.scss').pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError, )).pipe(gulp.dest('src/css'));
});

gulp.task('app', () => {
    gulp.watch('src/sass', gulp.series('run'));
});



gulp.task('mufix', (done) => {
    gulp.src('src/assets/**/*.*').
    pipe(image()).
    pipe(gulp.dest('src/assets'));
    gulp.src('src/assets/**/*.*').
    pipe(gulp.dest('src/assets1'));
    gulp.src('src/assets/**/*.css').
    pipe(css({ outputStyle: 'compressed' }).on('error', sass.logError, )).
    pipe(gulp.dest('src/assets1'));
    gulp.src('src/assets/**/*.js').
    pipe(javascript()).
    pipe(gulp.dest('src/assets1'));

    done();
});

gulp.task('node', (done) => {
    gulp.src('src/scss/*.scss').pipe(sass({ outputStyle: 'compressed' })).pipe(gulp.dest('assets/css'));
    gulp.src('src/js/*.js').pipe(javascript()).pipe(gulp.dest('assets/js'));
    done();
});

gulp.task('watch-node', () => {
    gulp.watch('src/js', gulp.series('node'));
    gulp.watch('src/scss', gulp.series('node'));
});
