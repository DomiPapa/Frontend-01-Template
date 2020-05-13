# 浏览器工作原理
## 总论与Http协议
URL --http--> HTML --parse--> DOM --css computing--> DOM with CSS --layout--> DOM with position --render--> Bitmap
## ISO-OSI七层网络模型 
- 应用、表示、会话 : HTTP   -->  require("http")
- 传输 : TCP、UDP  -->  require("net")
- 网络 : Internet
- 数据链路、物理层 : 4G/5G/WIFI
## TCP与IP的一些基础知识
- TCP
  - 流
  - 端口
  - require('net')
- IP
  - 包
  - IP地址
  - libnet/libpcap
## HTTP
- Request
  - request line : 
POST / HTTP/1.1
  - headers : 
Host : 127.0.0.1
Content-type : application/x-www-form-urlencoded
  - body:
field1=aaa&code=x%3D1
- Response
  - status line :
HTTP1.1 200 OK
  - headers :
Content-Type:  text/html
Date: Mon, 23 Dec 2019 06:46:19 GMT
Transfer-Encoding: chunked
  - body :
26
<html><body> Hello World<body></html>
0