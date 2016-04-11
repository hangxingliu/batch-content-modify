//文件内容处理函数
module.exports = function(file, content) {
	//文件名
	var filename = file.path.slice(file.path.search(/[\/\\][^\/\\]+?$/g)+1);
	
	//在此处处理文件内容
	
	return content;
};