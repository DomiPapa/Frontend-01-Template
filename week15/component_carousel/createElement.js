export function createElement(Cls, attributes,...children){
  // jsx中处理父子顺序是先子后父
  // console.log(arguments)

  let o;

  if(typeof Cls === "string"){
    // 处理标签写成小写的逻辑
    o = new Wrapper(Cls);
  }else{
    o = new Cls({
      timer: {}
    });
  }

  for(let name in attributes){
    o.setAttribute(name,attributes[name])
  }

  let visit = (children) => {
    for(let child of children){
      if(typeof child === "object" && child instanceof Array){
        visit(child);
        continue;
      }
      // 处理文字
      if(typeof child === "string")
        child = new Text(child)
      o.appendChild(child)
    }
  }

  visit(children)

  return o
}

export class Text {
  constructor(text){
    this.children = []
    this.root = document.createTextNode(text)
  }

  mountTo(parent){
    parent.appendChild(this.root)
  }
}

// 处理包装 代理到root上
export class Wrapper{
  constructor(type){
    // console.log("config", config)
    this.children = []
    this.root = document.createElement(type)
  }

  setAttribute(name,value){ 
    this.root.setAttribute(name, value)
  }


  appendChild(child){ //child
    this.children.push(child)
    // child.mountTo(this.root)
  }

  addEventListener(){
    this.root.addEventListener(...arguments)
  }

  get style(){
    return this.root.style 
  }

  mountTo(parent){
    parent.appendChild(this.root)
    for(let child of this.children){
      child.mountTo(this.root)
    }
  }
}