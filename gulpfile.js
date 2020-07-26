const gulp = require('gulp');
const sass = require('gulp-sass');
const typescript = require('gulp-typescript');
const  browserSync = require('browser-sync');

//sassのコンパイル
gulp.task('sass', (done) => {
    gulp.src('./src/scss/*.scss')
        .pipe(sass({
            outputStyle: "expanded"
        })
        )
        .on("error", sass.logError)
        .pipe(gulp.dest('./dest/css'));
    done();
});

//typescriptのコンパイル
gulp.task('ts', (done) => {
    gulp.src('./src/ts/*.ts')
        .pipe(typescript())
        .js
        .pipe(gulp.dest('./dest/js'));
    done();
});

//リロードするHTML
gulp.task('browser-sync', (done) => {
    browserSync.init({
        server: {
            baseDir: './dest/',
            index: 'index.html'
        },
    });
    done();
});

//リロードの設定
gulp.task('browser-reload', (done) => {
    browserSync.reload();
    done();
});

//監視ファイル
gulp.task('watch-files', (done) => {
    gulp.watch('./dest/css/*.css', gulp.task('browser-reload'));
    gulp.watch('./dest/*.html', gulp.task('browser-reload'));
    gulp.watch('./dest/js/*.js', gulp.task('browser-reload'));
    gulp.watch('./src/scss/*.scss', gulp.task('sass'));
    gulp.watch('./src/ts/*.ts', gulp.task('ts'));
    done();
});

//タスクの実行
gulp.task('default', 
gulp.series(gulp.parallel('watch-files', 'browser-sync', 'sass', 'ts'), (done) => {
    done();
}))


