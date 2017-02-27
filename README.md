# Js-Ajax
用原生JS封装ajax
# 一.HTTP请求的过程
* http是一种无状态协议，不建立持久的链接 
* http的请求过程：

1.建立TCP连接，

2.web浏览器向web服务器发送请求命令。

3.web浏览器发送请求头信息。

4.web服务器做出应答

5.web服务器发送应答头信息 ，

6.web服务器向浏览器发送数据

7.web服务器关闭tcp链接

# 二. HTTP请求，概念介绍  
* GET：
1.一般用于信息获取
2.使用URL传递参数
3.对所发送信息的数量也有限制，一般在2000个字符  
> 数据会在地址栏中显示，不安全，大小在32k内

* POST：
1.一般用于修改服务器上的资源  
2.对所发送信息的数量无限制
> 数据不会在地址栏中显示，相对安全，大小在1G内（可用于文件上传）

# 三.HTTP状态码
* **http状态码由3位数字构成，其中首位数字定义了状态码类型：**

1xx：信息类，表示收到web浏览器请求，正在进一步的处理中

2xx：成功，表示用户请求被正确接收，理解和处理

3xx：重定向，表示请求没有成功，客户必须采取进一步的动作(304:也是表示成功的，俗称“缓存”，就是用缓存来访问)

4xx：客户端错误，表示客户端提交的请求有错误，例如：404 not found，意味着请求中所引用的文档不存在。

5xx：服务器错误，表示服务器不能完成对请求的处理：如500  

# 四.ajax的全过程
## 1.创建对象(可参考以下几种)
* 1.1第一种,通过window对象
```javascript
/**1.创建兼容性的Ajax XMLHttpRequest对象
 *IE6+ Msxm12.XMLHTTP
 *<IE6 Microsoft.XMLHTTP
 */
 if(window.XMLHttpRequest){
   var xhr = new XMLHttpRequest();
} else {
   var xhr = new ActiveXObject("Microsoft.XMLHTTP");
}
```
* 1.2第二种，使用判断浏览器的方式
```
if(window.navigator.userAgent.indexOf("MSIE 6") !=-1){// ie6
   var xhr = new ActiveXObject("Microsoft.XMLHTTP");// ie678 
} else {
var xhr = new XMLHttpRequest();//ie7+高级浏览器
}
```
* 1.3第三种，使用try-catch(不推荐使用，比较耗性能)
```
try{
var xhr = new XMLHttpRequest();//ie7+高级浏览器 
} catch(e){
var xhr = new ActiveXObject("Microsoft.XMLHTTP");// ie678  
}
```
* 1.4第四种，通过typeof判断类型实现
```
if(typeof XMLHttpRequest == "function"){
var xhr = new XMLHttpRequest();//ie7+高级浏览器 
} else {
var xhr = new ActiveXObject("Microsoft.XMLHTTP");// ie678  
}
```
* 1.5第五种，
```
if("XMLHttpRequest" in window){
var xhr = new XMLHttpRequest();//ie7+高级浏览器 
} else {
var xhr = new ActiveXObject("Microsoft.XMLHTTP");// ie678  
}
```
## 2.连接
* xhr.open(方式,url地址,是否异步);如：``xhr.open("get",url,true);``

## 3.发送
* ``xhr.send();``

## 4.接收
* readystate 

0：对象已经创建，但请求未初始化，open方法还没有调用

1：服务器连接已经建立，open已经调用了

2：请求已接受，也就是接收到了头信息(数据发送完成)

3：请求处理中，接收数据，也就是接收到了报文头，响应体了

4：请求已完成，继续接收数据-报文体，且响应已就绪

* http状态码(见本文上面第三大点)
```
xhr.onreadystatechange = function(){
   if(xhr.readyState == 4){//完成
      clearTimeout(timer);
      if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
         options.success && options.success(xhr.responseText);//responseText: 获取字符串形式的响应数据
      } else {
         options.error && options.error(xhr.status);
      }
   }
};
```
