# utilities for frontend development

## install 

```
npm install git+ssh://git@github.com/10mado/frontend-utils.git#master --save-dev
```

## initialize gulp task

in `gulpfile.js`:

```
var gulpTasks = require('./').gulp(__dirname);
var gulp = require('gulp');
gulpTasks.all(gulp);
```

or

```
var gulpTasks = require('./').gulp(__dirname);
var gulp = require('gulp');
gulpTasks.sass(gulp,{compass:true});
// 'sass' and 'watch-sass' task automatically created with 10mado standard options.
```

### tasks

```
sass: compile sass
watch-sass: watch sass (not implemented)
js: minify js (not implemented)
watch-js: watch js (not implemented)
wig : build site with wig
icon : compile icons with fontcustom 
server : run Nodejs test server (defalut: localhost:3000)
server_php : run PHP test server (defalut: localhost:3000)
server_py : run Python test server (defalut: localhost:3000)
server_gae : run GAE test server (defalut: localhost:3000)
deploy_gae : deploy to GAE
open : open browser with specific url(defalut: localhost:3000)
```

### recommended directory structure

```
assets
assets/sass/  : sass(scss)
assets/js/    : js
assets/fonts/ : icon,fonts
public        : public dir
public/css    : public css dir
public/js     : public js dir
data          : data direcotry(for wig)
templates     : template directory(for wig)
```
