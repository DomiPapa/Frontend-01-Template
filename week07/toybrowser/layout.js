function getStyle(element) {
  // 将style存入一个对象,将其数值化便于计算
  if(!element.style){
    element.style = {};
  }
  // console.log("---style---")
  for (let prop of element.computedStyle) {
    // console.log(prop)
    let p = element.computedStyle.value;
    element.style[prop] = element.computedStyle[prop].value;

    if (element.style[prop].toString().match(/px$/)) {
      element.style[prop] = parseInt(element.style[prop]);
    }
    if (element.style[prop].toString().match(/^[0-9\.]+$/)) {
      element.style[prop] = parseInt(element.style[prop]);
    }
  }
  return element.style;
}
// 在计算位置前做一些准备工作
function layout(element) {
  // 没有style 直接return ，有style的使用getStyle进行预处理
  if (!element.computedStyle) {
    return ;
  }

  let elementStyle = getStyle(element);

  if(elementStyle.display !== "flex"){
    // 简化，非flex元素不处理
    return ;
  }

  // 过滤文本节点
  let items = element.children.filter(e => e.type === "element");

  items.sort(function (a, b) {
    return (a.order || 0) - (b.order || 0);
  })

  let style = elementStyle;

  ['width','height'].forEach(size => {
    if (style[size] === 'auto' || style[size] === ''){
      style[size] = null;
    }
  });

  // 设定默认值
  if(!style.flexDirection || style.flexDirection === 'auto'){
    style.flexDirection = 'row';
  }
  if(!style.alignItems || style.alignItems === 'auto'){
    style.alignItems = 'stretch';
  }
  if(!style.justifyContent || style.justifyContent === 'auto'){
    style.justifyContent = 'flex-start';
  }
  if(!style.flexWrap || style.flexWrap === 'auto'){
    style.flexWrap = 'nowarp';
  }
  if(!style.alignContent || style.alignContent === 'auto'){
    style.alignContent = 'strech';
  }

  let mainSize, mainStart, mainEnd, mainSign, mainBase, crossSize, crossStart, crossEnd, crossSign, crossBase;

  if(style.flexDirection === 'row'){
    mainSize = 'width';
    mainStart = 'left';
    mainEnd = 'right';
    // 排布方向
    mainSign = +1;
    // 排版起点
    mianBase = 0;

    crossSize = 'height';
    crossStart = 'top';
    crossEnd = 'bottom';
  }
  if(style.flexDirection === 'row-reverse'){
    mainSize = 'width';
    mainStart = 'right';
    mainEnd = 'left';
    mainSign = -1;
    mianBase = style.width;

    crossSize = 'height';
    crossStart = 'top';
    crossEnd = 'bottom';
  }
  if(style.flexDirection === 'column'){
    mainSize = 'height';
    mainStart = 'top';
    mainEnd = 'bottom';
    mainSign = +1;
    mianBase = 0;

    crossSize = 'width';
    crossStart = 'left';
    crossEnd = 'right';
  }
  if(style.flexDirection === 'column-reverse'){
    mainSize = 'height';
    mainStart = 'bottom';
    mainEnd = 'top';
    mainSign = -1;
    mianBase = style.height;

    crossSize = 'width';
    crossStart = 'left';
    crossEnd = 'right';
  }

  if(style.flexWrap === 'wrap-reverse'){
    let tmp = crossStart;
    crossStart = crossEnd;
    crossEnd = tmp;
    crossSign = -1;
  }else{
    crossBase = 0;
    crossSign = 1;
  }


  // 把元素收入行中,mainSize确定行是否满
  // 处理特殊情况，父元素未设mainSize,父元素mainSize是所有子元素之和
  let isAutoMainSize = false;
  if(!style[mainSize]){
    elementStyle[mainSize] = 0;
    for(let i = 0; i<items.length; i++){
      let item = items[i];
      if(itemStyle[mianSize] !== null || itemStyle[mainSize] !== (void 0)){
        elementStyle[mainSize] = elementStyle[mainSize] + itemStyle[mainSize];
      }
    }
    isAutoMainSize = true;
  }

  let flexLine = [];
  let flexLines = [flexLine];

  // 剩余空间mainSpace
  let mainSpace = elementStyle[mainSize];
  let crossSpace = 0;

  for(let i = 0; i < items.length; i++){
    let item = items[i];
    let itemStyle = getStyle(item);

    if(itemStyle[mainSize] === null){
      itemStyle[mainSize] = 0;
    }

    if(itemStyle.flex){
      flexLine.push(item);
    }else if(style.flexWrap === 'nowrap' && isAutoMainSize){
      mainSpace -= itemStyle[mainSize];
      if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)){
        crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
      }
      flexLine.push(item);
    }else{
      // item比单行还宽
      if(itemStyle[mainSize] > style[mainSize]){
        itemStyle[mainSize] = style[mainSize];
      }
      if(mainSpace < itemStyle[mainSize]){
        flexLine.mainSpace = mainSpace;
        flexLine.crossSpace = crossSpace;

        flexLine = [];
        flexLines.push(flexLine);

        flexLine.push(item);

        // 重置
        mainSpace = style[mainSize];
        crossSpace = 0;
      }else{
        flexLine.push(item);
      }
      if(itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)){
        crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
      }
      mainSpace -= itemStyle[mainSize];
    }
  }
  flexLine.mainSpace = mainSpace;
  
  console.log(items);
}

module.exports = layout;