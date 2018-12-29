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

interface IOptions {
  url: string;
  type?: string;
  data: any;
  timeout?: number;
  success: any;
  error: any;
}

function formatUrl(json) {
  let dataArr = [];
  json.t = Math.random();
  for (let key in json) {
    dataArr.push(`${key}=${encodeURIComponent(json[key])}`)
  }
  return dataArr.join('&')
}

export function ajax(options: IOptions) {
  if (!options.url) return;

  options.type = options.type || 'GET';
  options.data = options.data || {};
  options.timeout = options.timeout || 10000;

  let dataToUrlstr = formatUrl(options.data);
  let timer;
  
  // 1.创建
  let xhr;
  if ((window as any ).XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject('Microsoft.XMLHTTP');
  }

  if ( options.type.toUpperCase() === 'GET') {
    // 2.连接
    xhr.open('get', `${options.url}?${dataToUrlstr}`, true);
    // 3.发送
    xhr.send();
  } else if (options.type.toUpperCase() === 'POST') {
    // 2.连接
    xhr.open('post', options.url, true);
    xhr.setRequestHeader('ContentType', 'application/x-www-form-urlencoded');
    // 3.发送
    xhr.send(options.data);
  }

  // 4.接收
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      clearTimeout(timer);
      if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
        options.success && options.success(xhr.responseText);
      } else {
        options.error && options.error(xhr.status);
      }
    }
  }

  if (options.timeout) {
    timer = setTimeout(() => {
      xhr.abort();
    },options.timeout)
  }
}

let $: any = {}
$.ajax = ajax;

export default $;
