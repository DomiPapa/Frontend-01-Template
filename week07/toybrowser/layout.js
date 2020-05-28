function getStyle(element) {
  // 将style存入一个对象,将其数值化便于计算
  if (!element.style) {
    element.style = {};
  }
  // console.log("---style---")
  for (var prop of element.computedStyle) {
    // console.log(prop)
    var p = element.computedStyle.value;
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
    return;
  }

  var elementStyle = getStyle(element);

  if (elementStyle.display !== "flex") {
    // 简化，非flex元素不处理
    return;
  }

  // 过滤文本节点
  var items = element.children.filter((e) => e.type === "element");

  items.sort(function (a, b) {
    return (a.order || 0) - (b.order || 0);
  });

  var style = elementStyle;

  ["width", "height"].forEach((size) => {
    if (style[size] === "auto" || style[size] === "") {
      style[size] = null;
    }
  });

  // 设定默认值
  if (!style.flexDirection || style.flexDirection === "auto") {
    style.flexDirection = "row";
  }
  if (!style.alignItems || style.alignItems === "auto") {
    style.alignItems = "stretch";
  }
  if (!style.justifyContent || style.justifyContent === "auto") {
    style.justifyContent = "flex-start";
  }
  if (!style.flexWrap || style.flexWrap === "auto") {
    style.flexWrap = "nowarp";
  }
  if (!style.alignContent || style.alignContent === "auto") {
    style.alignContent = "strech";
  }

  var mainSize,
    mainStart,
    mainEnd,
    mainSign,
    mainBase,
    crossSize,
    crossStart,
    crossEnd,
    crossSign,
    crossBase;

  if (style.flexDirection === "row") {
    mainSize = "width";
    mainStart = "left";
    mainEnd = "right";
    // 排布方向
    mainSign = +1;
    // 排版起点
    mianBase = 0;

    crossSize = "height";
    crossStart = "top";
    crossEnd = "bottom";
  }
  if (style.flexDirection === "row-reverse") {
    mainSize = "width";
    mainStart = "right";
    mainEnd = "left";
    mainSign = -1;
    mianBase = style.width;

    crossSize = "height";
    crossStart = "top";
    crossEnd = "bottom";
  }
  if (style.flexDirection === "column") {
    mainSize = "height";
    mainStart = "top";
    mainEnd = "bottom";
    mainSign = +1;
    mianBase = 0;

    crossSize = "width";
    crossStart = "left";
    crossEnd = "right";
  }
  if (style.flexDirection === "column-reverse") {
    mainSize = "height";
    mainStart = "bottom";
    mainEnd = "top";
    mainSign = -1;
    mianBase = style.height;

    crossSize = "width";
    crossStart = "left";
    crossEnd = "right";
  }

  if (style.flexWrap === "wrap-reverse") {
    var tmp = crossStart;
    crossStart = crossEnd;
    crossEnd = tmp;
    crossSign = -1;
  } else {
    crossBase = 0;
    crossSign = 1;
  }

  // 把元素收入行中,mainSize确定行是否满
  // 处理特殊情况，父元素未设mainSize,父元素mainSize是所有子元素之和
  var isAutoMainSize = false;
  if (!style[mainSize]) {
    elementStyle[mainSize] = 0;
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (itemStyle[mianSize] !== null || itemStyle[mainSize] !== void 0) {
        elementStyle[mainSize] = elementStyle[mainSize] + itemStyle[mainSize];
      }
    }
    isAutoMainSize = true;
  }
  // 分行
  // 根据主轴尺寸，把元素分进行 若设置nowrap 则强行分配进第一行
  var flexLine = [];
  var flexLines = [flexLine];

  // 剩余空间mainSpace
  var mainSpace = elementStyle[mainSize];
  var crossSpace = 0;

  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var itemStyle = getStyle(item);

    if (itemStyle[mainSize] === null) {
      itemStyle[mainSize] = 0;
    }

    if (itemStyle.flex) {
      flexLine.push(item);
    } else if (style.flexWrap === "nowrap" && isAutoMainSize) {
      mainSpace -= itemStyle[mainSize];
      if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== void 0) {
        crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
      }
      flexLine.push(item);
    } else {
      // item比单行还宽
      if (itemStyle[mainSize] > style[mainSize]) {
        itemStyle[mainSize] = style[mainSize];
      }
      if (mainSpace < itemStyle[mainSize]) {
        flexLine.mainSpace = mainSpace;
        flexLine.crossSpace = crossSpace;

        flexLine = [];
        flexLines.push(flexLine);
        flexLine.push(item);

        // 重置
        mainSpace = style[mainSize];
        crossSpace = 0;
      } else {
        flexLine.push(item);
      }
      if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== void 0) {
        crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
      }
      mainSpace -= itemStyle[mainSize];
    }
  }
  flexLine.mainSpace = mainSpace;

  // console.log(items);
  // 计算主轴方向 找出所有flex元素 主轴方向剩余尺寸按比例分配给这些元素
  // 若剩余空间为负数,所有flex元素为0,等比压缩剩余元素
  if (style.flexWrap === "nowrap" || isAutoMainSize) {
    flexLine.crossSpace =
      style[crossSize] !== undefined ? style[crossSize] : crossSpace;
  } else {
    flexLine.crossSpace = crossSpace;
  }

  if (mainSpace < 0) {
    // 溢出(容器为单行时发生),按比例压缩元素
    var scale = style[mianSize] / (style[mianSize] - mainSpace);
    var currentMain = mainBase;
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var itemStyle = getStyle(item);
      // flex元素无宽度
      if (itemStyle.flex) {
        itemStyle[mainSize] = 0;
      }

      itemStyle[mainSize] = itemStyle[mianSize] * scale;

      itemStyle[mainStart] = currentMain;
      itemStyle[mainEnd] =
        itemStyle[mainStart] + mainSign * itemStyle[mainSize];
      currentMain = itemStyle[mainEnd];
    }
  } else {
    // 计算每一个flex line
    flexLines.forEach(function (items) {
      var mainSpace = items.mainSpace;
      // flex总值
      var flexTotal = 0;
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var itemStyle = getStyle(items);

        if (itemStyle.flex !== null && itemStyle.flex !== void 0) {
          flexTotal += itemStyle.flex;
        }
      }

      if (flexTotal > 0) {
        // 有flexible items
        var currentMain = mainBase;
        for (var i = 0; i < items.length; i++) {
          var item = items[i];
          var itemStyle = getStyle(item);

          if (itemStyle.flex) {
            itemStyle[mainSize] = (mainSpace / flexTotal) * itemStyle.flex;
          }
          itemStyle[mainStart] = currentMain;
          itemStyle[mainEnd] =
            itemStyle[mainStart] + mainSign * itemStyle[mainSize];
          currentMain = itemStyle[mainEnd];
        }
      } else {
        // 没有flexible items justifyContent 工作
        // 如果存在至少一个弹性元素，而且这个元素的flex-grow属性不等于0,那么对齐方式不会生效，就像没有多余空间的情况
        if (style.justifyContent === "flex-start") {
          var currentMain = mainBase;
          var step = 0;
        }
        if (style.justifyContent === "flex-end") {
          var currentMain = mainSpace * mainSign + mainBase;
          var step = 0;
        }
        if (style.justifyContent === "center") {
          var currentMain = (mainSpace / 2) * mainSign + mainBase;
          var step = 0;
        }
        if (style.justifyContent === "space-between") {
          var step = (mainSpace / (items.lengh - 1)) * mainSign;
          var currentMain = mainBase;
        }
        if (style.justifyContent === "space-around") {
          var step = (mainSpace / items.lengh) * mainSign;
          var currentMain = step / 2 + mainBase;
        }
        for (var i = 0; i < items.length; index++) {
          var item = items[i];
          itemStyle[mainStart] = currentMain;
          itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
          currentMain = itemStyle[mainEnd] + step;
        }
      }
    });
  }

  // 计算交叉轴,处理 align-items(父 ),align-self
  var crossSpace;
  if(!style[crossSize]){
    // auto sizing
    crossSpace = 0;
    elementStyle[crossSize] = 0;
    for(var i = 0; i < flexLines.length; i ++){
      elementStyle[crossSize] = elementStyle[crossSize] + flexLines[i].crossSpace;
    }
  }else {
    crossSpace = style[crossSize]
    for (var i = 0; i < flexLines.length; i++) {
      crossSpace -= flexLines[i].crossSpace;
    }
  }

  if(style.flexWrap === 'wrap-reverse'){
    crossBase = style[crossSize];
  }else{
    crossBase = 0;
  }

  var lineSize = style[crossSize] / flexLines.length;
  
  var step;
  if(style.alignContent === 'flex-start'){
    crossBase += 0;
    step = 0;
  }
  if(style.alignContent === 'flex-end'){
    crossBase += crossSign * crossSpace;
    step = 0;
  }
  if(style.alignContent === 'center'){
    crossBase += crossSign * crossSpace / 2;
    step = 0;
  }
  if(style.alignContent === 'space-between'){
    crossBase += 0;
    step = crossSpace / (flexLines.length -1);
  }
  if(style.alignContent === 'space-around'){
    step = crossSpace / (flexLines.length);
    crossBase += crossSign * step /2;
  }
  if(style.alignContent === 'stretch'){
    crossBase += 0;
    step = 0;
  }
  flexLines.forEach(function(items){
    var lineCrossSize = style.alignContent === 'stretch'?
        items.crossSpace + crossSpace / flexLines.length :
        items.crossSpace;
    for(var i = 0; i < items.length; i++){
      var item = items[i];
      var itemStyle = getStyle(item);

      var align = itemStyle.alignSelf || style.alignItems;

      if(itemStyle[crossSize] === null){
        itemStyle[crossSize] = (align === 'stretch') ? lineCrossSize : 0;
      }

      if(align === 'flex-start'){
        itemStyle[crossStart] = crossBase;
        itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crossSize];
      }

      if(align === 'flex-end'){
        itemStyle[crossEnd] = crossBase + crossSign * lineCrossSize;
        itemStyle[crossStart] = itemStyle[crossEnd] - crossSign * itemStyle[crossSize];
      }

      if(align === 'center'){
        itemStyle[crossStart] = crossBase + crossSign * (lineCrossSize - itemStyle[crossSize]) / 2;
        itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crossSize];
      }

      if(align === 'stretch'){
        itemStyle[crossStart] = crossBase;
        itemStyle[crossEnd] = crossBase + crossSign * ((itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)) ?
            itemStyle[crossSize] : lineCrossSize);
        itemStyle[crossSize] = crossSign * (itemStyle[crossEnd] - itemStyle[crossStart]);
      }
    }
    crossBase += crossSign * (lineCrossSize + step);
  });
  // console.log(items);
}

module.exports = layout;
