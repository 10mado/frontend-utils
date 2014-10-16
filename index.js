"use strict";

var fe = exports;

var _ = require('lodash');
var used = [];

// compile sass (+ autoprefixer) =======
fe.sass = function(gulp,opt){
  gulp.task('sass', function(){
  });
};

// compass (+ autoprefixer) ========
fe.compass = function(gulp,opt){
  gulp.task('compass', function(){
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
    outDir: 'public',
    verbose: true
  };
  opt = _.merge(def,opt);
  var builder = new Wig(opt);
  gulp.task('wig', function(){
    try{
      builder.build();
    }catch(e){
      console.log(e);
    }
  });
};

// test server(node)
fe.server = function(gulp,opt){
  var connect = require('gulp-connect');
  var def = {
    root:'public',
    port:3000
  };
  opt = _.merge(def,opt);
  gulp.task('server', function(){
    connect.server(opt);
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

// test server(PHP)
fe.server_php = function(gulp, opt){
  var shell = require('gulp-shell');
  var def = {
    root:'public',
    port:3000
  };
  opt = _.merge(def,opt);
  var cmd = 'php -S localhost:' + opt.port + ' -t ' + opt.root;
  gulp.task('server_php', shell.task([ cmd ]));
};

// test server(Python)
fe.server_py = function(gulp, opt){
  gulp.task('server_py', function(){
  });
};

// test server(GAE)
// deploy to GAE

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
