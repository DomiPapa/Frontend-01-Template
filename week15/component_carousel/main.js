import {createElement, Text, Wrapper} from './createElement'

import {Carousel} from "./carousel.view"

/*
class Carousel {
  constructor(config){
    this.children = []
    this.attributes = new Map()
    this.properties = new Map()
  }

  setAttribute(name, value){ 
    this[name] =  value
  }

  appendChild(child){ 
    this.children.push(child)
  }

  render(){
    let children = this.data.map( url => {
      let element = <img src = {url}/>;
      element.addEventListener("dragstart", event => event.preventDefault())
      return element
    })

    let root =  <div class="carousel">
        {children}
    </div>

    let position = 0;

    // 无限循环回调
    let nextPic = () => {
      // debugger
      // 对数据长度取余小技巧
      let nextPosition = (position + 1) % this.data.length;
      let current = children[position];
      let next = children[nextPosition];
      // 动画代码 起始位置
      current.style.transition = "ease 0s";
      next.style.transition = "ease 0s";
      current.style.transform = `translateX(${-100 * position}%)`;
      next.style.transform = `translateX(${100 - 100 * nextPosition}%)`;
      // 这里如果使用requestAnimationFrame 需要套两层          
      setTimeout(function () {

        // 动画代码 终止位置
        // 把current移动到-100%的位置 把下一张挪到0的位置（无论当前位置是哪里，依据原始位置进行计算）
        current.style.transition = ""; // "" means use css rules
        next.style.transition = "";
        current.style.transform = `translateX(${-100 - 100 * position}%)`;
        next.style.transform = `translateX(${-100 * nextPosition}%)`;
        position = nextPosition;
      },16);
      setTimeout(nextPic, 3000);
    };
    // 先等三秒执行第一次
    setTimeout(nextPic, 3000);


    return root;

  }

  mountTo(parent){
    this.render().mountTo(parent)
  }
}

let component = <Carousel data = {[
    "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
    "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
    "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
    "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
  ]}></Carousel>

component.mountTo(document.body)
*/


let component = <Carousel data = {[
  "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
  "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
  "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
  "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
]}></Carousel>

component.mountTo(document.body)