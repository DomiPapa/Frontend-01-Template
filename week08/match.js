// 检查某元素是否match 字符串选择器
// 分析 处理简单选择器id与class 的复合

function match(element, selector) {
  if (!selector || !element.attributes) {
    return false;
  }
  // 先判断类型是否对得上
  let regTag = /(^\w+)/;
  if(selector.match(regTag).length !== 0){
    // 选择器字符串以类型开头
    if(element.tagName !== RegExp.$1){
      return false;
    }
  }
  // 判断id是不是对得上(id选择器若存在应只有一个，这里不判断不合理的情况了)
  let regId = /(#\w+)/;
  if (selector.match(regId).length!==0) {
    let attr = element.attributes.filter(attr => attr.name === "id")[0];
    // 复合选择器的id选择器不匹配
    if(!attr || attr.value !== RegExp.$1.replace("#",''))
    return false;
  }
  // 继续判断是否匹配类选择器是否都匹配
  let regClass = /(\.\w+)/g; 
  let classArr = selector.match(regClass).map(e => e.replace(".",''));
  let attrClassArr = element.attributes.filter(attr => attr.name === "class");
  let beMatchedArr = [];
  attrClassArr.forEach(e => {
    beMatchedArr.push(e.value)
  });
  if (beMatchedArr.length != classArr.length) {
    // 个数不一致
    return false;
  }else{
    // 个数一一致 存在class名对不上
    for (let i = 0; i < attrClassArr.length; i++) {
      const e = attrClassArr[i];
      if(beMatchedArr.indexOf(e)===-1){
        return false;
      }
    }
    // 都循环完 没退出 说明都匹配上了 
  }
  // 都通过 返回true
  return true;
}

// 测试
match("div #id.class",document.getElementById("id"));
