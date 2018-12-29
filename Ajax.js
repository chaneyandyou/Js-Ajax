/*
* By Chaney
*用法：
* $.ajax({
* 	url:url,
* 	data:{},
* 	success:function(){},
* 	error:function(){}
* })
* */
var $ = {};

$.ajax = ajax;

function formatUrl(json){
	
	var arr = [];
	
	json.t = Math.random();
	for(var name in json){
		arr.push(name + "=" + encodeURIComponent(json[name]));
	}
	return arr.join("&");
}



function ajax(options){

	options = options || {};
	if(!options.url)return ;
	
	options.type = options.type || "get";
	options.data = options.data || {};
	options.timeout = options.timeout || 0;
	
	
	var str = formatUrl(options.data);
	
	//1 创建
	if(window.XMLHttpRequest){
		var xhr = new XMLHttpRequest();
	} else {
		var xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	if(options.type == "get"){
		//2 连接
		xhr.open("get",options.url + "?" + str,true);
		//3 发送
		xhr.send();

	} else {
		//2 连接
		xhr.open("post",options.url,true);
		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		//3 发送
		xhr.send(str);
	}
		
	//4 接收
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){//完成
			clearTimeout(timer);
			if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
				options.success && options.success(xhr.responseText);
			} else {
				options.error && options.error(xhr.status);
			}
		}
	};
	
	if(options.timeout){
		var timer = setTimeout(function(){
			xhr.abort();	
		},options.timeout);
	}
}