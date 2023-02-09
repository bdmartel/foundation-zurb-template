
var tinify = require('gulp-tinify');
 
gulp.task('tinify', function() {
    gulp.src('src/assets/img/photos/**/*')
        .pipe(tinify('2v4Nkk4J1NVS0wxtdGhcsrZrNPGdyfgP'))
        .pipe(gulp.dest('src/assets/img/photos/thumbs'));
});