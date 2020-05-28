// 安装images 图片解码库

const images = require('images');

function render(viewport, element) {
  if (element.style) {
    let img = images(element.style.width, element.style.height);

    if(element.style["background-color"]){
      let color = element.style["background-color"] || "rgb(0,0,0)";
      color.math(/rgb\((\d+),(\d+),(\d+)\)/);
      // 以制定颜色填充图像
      img.fill(Number(RegExp.$1),Number(RegExp.$2),Number(RegExp.$3),1);
      // 绘制
      viewport.draw(img,element.style.left||0,element.style.top||0);
    }   
  }

  if(element.children){
    for(var child of element.children){
      render(viewport, child);
    }
  }
}

module.exports = render;