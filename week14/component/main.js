// require("./foo.js")
// import "./foo";

function create(Cls, attributes,...children){
  // jsx中处理父子顺序是先子后父
  console.log(arguments)

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
    // 特性值和属性值一致,写成如下方式
    // o[name] = attributes[name]
    // 若不希望特性值和属性值一致,可写成如下方式
    o.setAttribute(name,attributes[name])
  }

  for(let child of children){

    // 处理文字
    if(typeof child === "string")
        child = new Text(child)
    o.appendChild(child)
    // o.children.push(child)
  }
  console.log(children)
  return o
}

class Text {
  constructor(text){
    this.children = []
    this.root = document.createTextNode(text)
  }

  mountTo(parent){
    parent.appendChild(this.root)
  }
}

class Wrapper{
  constructor(type){
    // console.log("config", config)
    this.children = []
    this.root = document.createElement(type)
  }

  set class(v){ // property
    console.log("Parent::class", v)
  }

  set id(v){ // property
    console.log("Parent::id", v)
  }

  setAttribute(name,value){ // attribute
    // console.log(name,value)
    this.root.setAttribute(name, value)
  }

  // appendChild(child){ //child
  //   console.log("Parent::apendChild",child)
  // }

  appendChild(child){ //child
    this.children.push(child)
    // child.mountTo(this.root)
  }

  mountTo(parent){
    parent.appendChild(this.root)
    for(let child of this.children){
      child.mountTo(this.root)
    }
  }
}

class MyComponent{
  constructor(config){
    // console.log("config", config)
    this.children = []
    // this.root = document.createElement("div")
  }

  set class(v){ // property
    console.log("Parent::class", v)
  }

  set id(v){ // property
    console.log("Parent::id", v)
  }

  setAttribute(name,value){ // attribute
    // console.log(name,value)
    this.root.setAttribute(name, value)
  }

  // appendChild(child){ //child
  //   console.log("Parent::apendChild",child)
  // }

  appendChild(child){ //child
    this.children.push(child)
    // child.mountTo(this.root)
  }

  render(){
    return <article>
      <header>i'm a header</header>
      {this.slot}
      <footer>i'm a footer</footer>
    </article>
  }

  mountTo(parent){
    this.slot = <div></div>
    for(let child of this.children){
      this.slot.appendChild(child)
    }
    this.render().mountTo(parent)
    // parent.appendChild(this.root)
  }
}


// let component = <div id="a" class="b" style="width:100px;height:100px;background-color:lightgreen">
//     <div></div>
//     <div></div>
//     <p></p>
//     <div></div>
//   </div>

// let component = <div>text</div>

// let component = <div>{new Wrapper("span")}</div>
// component.class = "c"
// component.id = "d"
// console.log(component)

let component = <MyComponent>
  <div>text text text</div>
</MyComponent>

component.mountTo(document.body)


// component.setAttribute("id","a");