//文件内容处理函数
//File content handler function
module.exports = function(file, content) {
	//Filename,文件名
	var filename = file.path.slice(file.path.search(/[\/\\][^\/\\]+?$/g)+1);
	
	//在此处处理文件内容
	//You can write your content handler code in here...
	
	return content;
};