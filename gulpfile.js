//Adiciona os móduos instalados
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const merge = require('merge-stream');

//Função para compilar e comprimir o Sass
function compilaSass() {
  return gulp.src('css/scss/*.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream())
}

//Tarefa do Sass
gulp.task('sass', compilaSass);

//Função para juntar JS
function gulpJS() {
  return gulp.src('js/main/*.js')
    .pipe(concat('main.js'))
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(terser())
    .pipe(gulp.dest('js/'))
    .pipe(browserSync.stream())
}

//Tarefa do JS
gulp.task('mainJS', gulpJS);

//Função para Plugins
function pluginJS() {
  return gulp.src([
    'node_modules/jquery-mask-plugin/dist/jquery.mask.min.js'
  ])
    .pipe(concat('plugins.js'))
    .pipe(gulp.dest('js/'))
    .pipe(browserSync.stream())
}

var deps = {
  "bootstrap": {
    "dist/**/*": ""
  },
  "jquery": {
    "dist/jquery.min.js": ""
  },
  "@fortawesome/fontawesome-free/css": {
    "**/*": ""
  },
  "@fortawesome/fontawesome-free/js": {
    "**/*": ""
  },
  "@fortawesome/fontawesome-free/webfonts": {
    "**/*": ""
  },
  "moment": {
    "min/**/*": ""
  }
};

gulp.task("scripts", function () {

  var streams = [];

  for (var prop in deps) {
    console.log("Prepping Scripts for: " + prop);
    for (var itemProp in deps[prop]) {
      streams.push(gulp.src("node_modules/" + prop + "/" + itemProp)
        .pipe(gulp.dest("libs/" + prop + "/" + deps[prop][itemProp])));
    }
  }

  return merge(streams);

});

//Tarefa do PluginJS
gulp.task('pluginJS', pluginJS);

//Função para iniciar o Browser
function browser() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
    // tunnel: true
  });
}

//Tarefa para iniciar o Browser-Sync
gulp.task('browser-sync', browser);

//FUnção de watch do gulp
function watch() {
  gulp.watch('css/scss/*.scss', compilaSass);
  gulp.watch('js/main/*.js', gulpJS);
  gulp.watch('js/plugins/*.js', pluginJS);
  gulp.watch('*.html').on('change', browserSync.reload);
}

//Inicia a tarefa de watch
gulp.task('watch', watch);

//Tarefa padrão do Gulp
gulp.task('default', gulp.parallel('watch', 'browser-sync', 'sass', 'mainJS', 'pluginJS'));