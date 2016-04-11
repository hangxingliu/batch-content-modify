var src				= 	'';//Source Floder Name,For example:'src',原目录
var dest			= 	'';//Destination Floder Name,For examle:'dest',修改后保存的目录
var force			= 	false;//Is Delete Force?,不强制删除(如果保存目录不在当前目录的子目录下,就需要设为true)
var filename		=	[];//Filename filter,For example:['*.js','!*.min.js'],需要修改内容的文件的文件名筛选数组,例如:['*.js','!*.min.js']
var inputCharset	=	'';//Reading charset,读取使用的编码(为空表示默认编码)
var outputCharset	=	'utf8';//Writeing charset,写入使用的编码(为空表示默认编码)
var handler 		=	require('./handler.js');

module.exports = {
	src			: src,
	dest		: dest,
	force		: force,
	filename	: filename,
	handler		: handler,
	charset		: {
		in			: inputCharset,
		out			: outputCharset
	}
};