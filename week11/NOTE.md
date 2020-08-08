# 异步编程
## 红绿灯问题思考总结(绿10黄2红5)
1. 采用复合class管理三个灯的样式
2. 业务逻辑与时序逻辑分离，构造红黄绿三个函数，也便于单独测试

## async generator
```
function* g(){
  yield 1;
  yield 2;
  yield 3;
}

for(let v of g()){
  console.log(v)
}
```

```
function sleep(t) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, t);
  });
}

async function* g(){
  let i = 0;
  while(true){
    await sleep(1000);
    yield i++;
  }
}

for await (let v of g()){
  console.log(v)
}
```