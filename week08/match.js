// 检查某元素是否match 字符串选择器
function match(element, selector) {
  if (!selector || !element.attributes) {
    return false;
  }
  if (selector.charAt(0) == "#") {
    let attr = element.attributes.filter(attr => attr.name === "id")[0];
    if(attr && attr.value === selector.replace("#",''))
    return true;
  } else if(selector.charAt(0) == '.') {
    let attr = element.attributes.filter(attr => attr.name === "class")[0];
    // 省略了空格分隔的class情况
    
    if(attr && attr.value === selector.replace(".",''))
    return true;
  } else {
    if (element.tagName === selector) {
      return true;
    }
  }
}

// 测试
match("div #id.class",document.getElementById("id"));