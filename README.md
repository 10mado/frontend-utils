# utilities for frontend development

## install 

```
npm install git+ssh://git@github.com/10mado/frontend-utils.git#master --save
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
