//const concat = require('gulp-concat');
//const imagemin = require('gulp-imagemin');
//const uglify = require('gulp-uglify');

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const exec = require('child_process').exec;
const rename = require("gulp-rename");
const htmlreplace = require("gulp-html-replace");
const glob = require("glob")

// open Server
gulp.task('serve', function() {
  exec('lite-server --baseDir="./public"', function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
  });
});

// Compile Sass
gulp.task('sass', function(){
  gulp.src('scss/*.scss')
      .pipe(sass().on('error', sass.logError)) //sass({outputStyle: 'compressed'})
      .pipe(autoprefixer())
      .pipe(gulp.dest('public/css'));
});


gulp.task('default', ['sass','serve']); //['message', 'copyHtml', 'imageMin', 'sass', 'scripts']
gulp.task('dev',['watch','serve'])
gulp.task('watch', function(){
  gulp.watch('scss/*.scss', ['sass']);
});
