"use strict";

var frontendUtils = exports;

frontendUtils.gulp = function(rootPath){

var fe = {};
var path = require('path');

var _ = require('lodash');
var used = [];

// compile sass (+ autoprefixer) =======
fe.sass = function(gulp,opt){
  var sass = require('gulp-sass');
  var prefix = require('gulp-autoprefixer');
  var plumber = require('gulp-plumber');
  var def = {
    src:[rootPath+'/assets/sass/**/*.scss', rootPath+'/assets/sass/**/*.sass'],
    dest:rootPath+'/public/assets/css',
    style: 'compact',
    loadPath:[
      __dirname + '/node_modules/bootstrap-sass/assets/stylesheets',
      __dirname + '/bower_components/csswizardry-grids'
    ],
    prefixer:{
      browsers:['last 2 versions', '> 4%']
    }
  }
  opt = _.assign(def,opt);

  gulp.task('sass', function(){
    var g = gulp.src(opt.src)
      .pipe(plumber())
      .pipe(sass({
        includePaths:opt.loadPath,
        outputStyle:opt.style
      }).on('error',sass.logError))
    if(opt.prefixer){
      g = g.pipe(prefix(opt.prefixer));
    }
      g = g.pipe(plumber.stop())
        .pipe(gulp.dest(opt.dest))
  });
  gulp.task('watch-sass',function(){
    gulp.watch(opt.src, ['sass']);
  });
};

// minify js ========================
fe.js = function(gulp,opt){
  gulp.task('js', function(){
  });
};

// package js with browserify ==================
fe.js_browserify = function(gulp,opt){
  gulp.task('js_browserify', function(){
  });
};

// package with webpack =====================
fe.webpack = function(gulp,opt){
  gulp.task('webpack', function(){
  });
};

// with bower ===============================
fe.bower = function(gulp,opt){
  gulp.task('bower', function(){
  });
};

// compile icons with fontcustom
fe.icons = function(gulp,opt){
  var shell = require('gulp-shell');
  gulp.task('icons', shell.task([
    'fontcustom compile'
  ]));
};

// wig ==========================
fe.wig = function(gulp,opt){
  var Wig = require('wig');
  var def = {
    rootDir: rootPath,
    outDir: 'public',
    dataDir: 'data',
    tmplDir: 'templates',
    verbose: true
  };
  opt = _.assign(def,opt);
  var builder = new Wig(opt);
  gulp.task('wig', function(){
    try{
      builder.build();
    }catch(e){
      console.log(e);
    }
  });
  var src = [
    path.join(opt.rootDir,opt.dataDir,'**','*'),
    path.join(opt.rootDir,opt.tmplDir,'**','*')
  ]
  gulp.task('watch-wig',function(){
    gulp.watch(src, ['wig']);
  });
};

// open URL with browser
fe.open = function(gulp,opt){
  var open = require('open');
  var url = opt.url || 'http://localhost:3000';
  gulp.task('open', function(){
    open(url);
  });
}

// test server(node)
fe.server_node = function(gulp,opt){
  var connect = require('gulp-connect');
  var def = {
    root:'public',
    port:3000
  };
  opt = _.assign(def,opt);
  gulp.task('server_node', function(){
    connect.server(opt);
  });
};

// test server(PHP)
fe.server_php = function(gulp, opt){
  var shell = require('gulp-shell');
  var def = {
    root: rootPath + '/public',
    port: 3000
  };
  opt = _.assign(def,opt);
  var cmd = 'php -S localhost:' + opt.port + ' -t ' + opt.root;
  gulp.task('server_php', shell.task([ cmd ]));
};

// test server(Python)
fe.server_py = function(gulp, opt){
  var shell = require('gulp-shell');
  var def = {
    root: rootPath + '/public',
    port: 3000
  };
  opt = _.assign(def,opt);
  gulp.task('server_py', shell.task([
    'pushd ' + opt.root + '; python -m SimpleHTTPServer ' + opt.port + '; popd'
  ]));
};

// test server(GAE)
fe.server_gae = function(gulp, opt){
  var shell = require('gulp-shell');
  var def = {
    root: rootPath + '/public',
    port: 3000
  };
  opt = _.assign(def,opt);
  gulp.task('server_gae', shell.task([
    'dev_appserver.py --port=' + opt.port + ' ' + opt.root
  ]));
};

// deploy to GAE
fe.deploy_gae = function(gulp, opt){
  var shell = require('gulp-shell');
  var def = {
    root: rootPath + '/public'
  };
  opt = _.assign(def,opt);
  gulp.task('deploy_gae',shell.task([
    'appcfg.py --oauth2 update ' + opt.root + ' --no_cookies'
  ]));
};



// utility method to create all tasks
fe.all = function(gulp, opt){
  if(opt === undefined){
    opt = {};
  }
  for(var key in fe){
    if(key !== 'all'){
      var taskOpt = opt[key] || {};
      fe[key](gulp,taskOpt);
    }
  }
};

return fe;

}
