/**
 * A Gulp Script to batch modify file content.
 * 批量修改文件内内容的Gulp脚本
 * @author 刘越
 * @version 1.0.1
 * @date 2016/04/11
 */

//加载配置
//Load Config File
var cfg = require('./config.js');

//生成源目录路径和目标目录路径
//Generate Paths
var SRC = cfg.src;
var DEST = cfg.dest;
var DEST_PATH = DEST + '/';
var SRC_PATH = SRC + '/';

//生成清理参数
//Generate Clean Options
var OPT_CLEAN = {};
if(cfg.cleanForce)
	OPT_CLEAN.force = true;

//生成需要处理的文件的名称数组
//Generate Filename filters
var SRC_FILES = cfg.filename;
var DEST_FILES = [];
for(var i in SRC_FILES) {
	var name = SRC_FILES[i];
	var not = 0;
	if(not = (name[0] == '!') )
		name = name.slice(1);
	SRC_FILES[i] = (not?'!':'' ) + './' + SRC_PATH + '**/' + name;
	DEST_FILES.push((not?'!':'' ) + './' + DEST_PATH + '**/' + name);
}

//-------------____引入一些必要的外挂____-------------------
//Include The Plugin script need
var g = require("gulp");
var cleaner = require("gulp-clean");
var through = require('through2');
var gutil = require('gulp-util');
var Error = gutil.PluginError;

//-------------____生成外挂____-------------------------------
//Define the content handler function
function handler() {
	return through.obj(function (file, enc, cb) {
		//空文件直接跳入下一个
		//Empty File, Don't handler
        if (file.isNull()) {
            this.push(file);
            return cb();
        }
        //处理文件
		//Handler Buffer Content
        if (file.isBuffer()) {
            file.contents = new Buffer(
				cfg.handler(file,file.contents.toString(cfg.charset.in || enc)),
				cfg.charset.out || enc);
        }
		//I have not write some code to handler stream content
        if (file.isStream()) {
			//https://github.com/nfroidure/BufferStreams
            this.emit('error', new Error(PLUGIN_NAME, '暂时不支持 Streams!'));
      		return cb();
        }
		//文件进入下一个gulp插件
		//Push Content to next gulp plugin
        this.push(file);
        cb();
    });
};


//------------------Gulp任务----------------------
//Define Gulp Task function
g.task('default', ['go']);

g.task('go', ['copy-target']);

g.task('copy-target', ['clean-target'], function () {
	return g.src(SRC_FILES, {base: ''})
			.pipe(handler())
			.pipe(g.dest(DEST_PATH));
});

g.task('clean-target', ['copy-all'], function() {
	return g.src(DEST_FILES, {read: false})
			.pipe(cleaner(OPT_CLEAN));
});

g.task('copy-all', ['clean-all'], function () {
	return g.src('./' + SRC_PATH + '**', {base: ''})
			.pipe(g.dest(DEST_PATH));
});

g.task('clean-all', function () {
	return g.src(DEST_PATH + '*', {'read': false})
			.pipe(cleaner(OPT_CLEAN));
});