const gulp = require('gulp');
const asciidoctor = require('@asciidoctor/gulp-asciidoctor');
const browserSync = require('browser-sync').create();

function asciidoctorTask() {
  return gulp.src('main.adoc')
    .pipe(asciidoctor({}))
    .pipe(gulp.dest('_build'));
}

function browsersyncServe(cb) {
  browserSync.init({
    server: {
      baseDir: "./_build",
      index: "main.html",
      middleware: [
        function (req, res, next) {
          res.setHeader("Expires", "0");
          res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
          res.setHeader("Pragma", "no-cache");

          next();
        }
      ]
    }
  });
  cb();
}

function browsersyncReload(cb) {
  browserSync.reload();
  cb();
}

function watchTask() {
  gulp.watch("*.adoc", gulp.series(
    asciidoctorTask,
    browsersyncReload,
  ));
}

exports.default = gulp.series(
  asciidoctorTask,
  browsersyncServe,
  watchTask
);
