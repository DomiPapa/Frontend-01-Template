const http = require("http");

const server = http.createServer((req,res)=>{
  console.log("request received")
  // console.log(req.getHeader("X-Foo2"))
  console.log(req.headers)
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('X-Foo', 'text/plain');
  res.writeHead(200, { 'Content-Type':'text/plain' });
  res.end('OK!\n');
})

server.listen(8088);