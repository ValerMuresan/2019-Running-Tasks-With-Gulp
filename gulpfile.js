const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const eslint = require('gulp-eslint');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');


//Set the default task
function gulpDefault(done) {
  //Gulp will initiate live browser
  browserSync.init({
    server: './dist'
  });
  gulpWatch();
  done();
};

//Set the sass compile task in css
function gulpStyle() {
  return gulp.src('./sass/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  //Set the autoprefixer task
  .pipe(autoprefixer({
    cascade: false
  }))
  // Create dist file and move location to dist
  .pipe(gulp.dest('dist/css'))
  //The sync will be available for all the browsers
  .pipe(browserSync.stream());
}

//Set the eslint task for scripts
function gulpLint() {
  return gulp.src('js/**/*.js')
  /* eslint() attaches the lint output to the eslint property
   of the file object so it can be used by other modules.
   */
  .pipe(eslint())
  // eslint.format() outputs the lint results to the console.
  .pipe(eslint.format())
/* To have the process exit with an error code (1) on lint error
return the stream and pipe to failOnError last.
*/
.pipe(eslint.failOnError())
}

//Set the watch task
function gulpWatch() {

  //Gulp will update every change in bellow files
  gulp.watch('sass/**/*.scss', gulpStyle);
  gulp.watch('./*.html').on('change', browserSync.reload);
  gulp.watch('js/**/*.js').on('change', browserSync.reload);
  gulp.watch('js/**/*.js', gulpLint);
  gulp.watch('./index.html', gulpCopyHtml);
}

//Copy the index.html in dist file - task
function gulpCopyHtml() {
  return gulp.src('./index.html')
  .pipe(gulp.dest('./dist'));
}

//Copy the images file in dist file -task
function gulpCopyImages() {
  return gulp.src('images/*')
  .pipe(gulp.dest('dist/images'));
}

//Copy the javaScript files in dist folder and concatenate in all.js -task
function gulpScripts() {
  return gulp.src('js/**/*.js')
  .pipe(concat('all.js'))
  .pipe(gulp.dest('dist/js'));
}

exports.gulpScripts = gulpScripts;
exports.gulpCopyImages = gulpCopyImages;
exports.gulpCopyHtml = gulpCopyHtml;
exports.gulpWatch = gulpWatch;
exports.gulpLint = gulpLint;
exports.gulpStyle = gulpStyle;
exports.gulpDefault = gulpDefault;
