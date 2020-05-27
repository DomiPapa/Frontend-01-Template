const css = require('css')

const EOF = Symbol("EOF"); // EOF: End Of File

const layout = require("./layout.js")

let currentToken = null;

let currentAttribute = null;

let stack = [{
  type:"document",
  children:[]
}];

let currentTextNode = null;

// 加入一个新的函数，addCSSRules，这里把CSS规则暂存到一个数组里
let rules = [];
function addCSSRules(text) {
  let ast = css.parse(text);
  rules.push(...ast.stylesheet.rules);
}

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

// 优先级 未实现复合型
function specificity(selector) {
  // 0 表示高位 左高右低
  let p = [0, 0, 0, 0];
  let selectorParts = selector.split(" ");
  for (let part of selectorParts) {
    if(part.charAt(0) == "#"){
      p[1] += 1;
    }else if(part.charAt(0) == "."){
      p[2] += 1;
    }else {
      p[3] += 1;
    }
    return p;
  }
}


function compare(sp1, sp2) {
  // 从高向低 按位比较 非标准比较方式
  if(sp1[0] - sp2[0]){
    return sp1[0] - sp2[0];
  }
  if(sp1[1] - sp2[1]){
    return sp1[1] - sp2[1];
  }
  if(sp1[2] - sp2[2]){
    return sp1[2] - sp2[2];
  }
  return sp1[3] - sp2[3];
}

function computeCSS(element) {
  // 数组slice方法双参数不传 会浅拷贝一份数组 原始数组不改变 trick
  let elements = stack.slice().reverse();
  if(!element.computedStyle){
    element.computedStyle = {};
  }
  for(let rule of rules){
    let selectorParts = rule.selectors[0].split(" ").reverse();
    // 先找到对应的rule
    if(!match(element, selectorParts[0])){
      continue;
    }

    let matched = false;

    let j = 1;
    
    for(let i = 0; i < elements.length; i++){
      if(match(elements[i]), selectorParts[j]){
        j ++;
      }
    }
    if(j >= selectorParts.length){
      matched = true;
    }
    if(matched){
      // 选择器匹配成功 rule内容加入计算属性上
      let sp = specificity(rules.selectors[0]);
      let computedStyle = element.computedStyle;
      for(let declaration of rule.declarations){
        if(!computedStyle[declaration.property]){
          computedStyle[declaration.property] = {};
        }
        if(!computedStyle[declaration.property].specificity){
          // 无sp不冲突
          computedStyle[declaration.property].value = declaration.value;
          computedStyle[declaration.property].specificity = sp;
        }else if(compare(computedStyle[declaration.property].specificity, sp) < 0){
          // 原先的优先级更低
          computedStyle[declaration.property].value = declaration.value;
          computedStyle[declaration.property].specificity = sp;
        }
      }
    }
  }
}

function emit(token) {
  // console.log(token)
  let top = stack[stack.length - 1];
  if (token.type == "startTag") {
    let element = {
      type:"element",
      children:[],
      attributes:[]
    };
    element.tagName = token.tagName;
    for (let p in token) {
      if(p != "type" || p != "tagName"){
        element.attributes.push({
          name: p,
          value:token[p]
        });
      }    
    }
    // css计算 只要有元素创建 就计算一次
    // css 计算时机
    computeCSS(element);
    // 计算完css才push
    top.children.push(element);
    element.parent = top;

    if(!token.isSelfClosing){
      stack.push(element);
    }  
    currentTextNode = null;
  } else if(token.type == "endTag"){
    if(top.tagName != token.tagName){
      throw new Error("Tag start end doesn't match!");
    } else {
      // 遇到style标签时，执行添加CSS规则的操作
      if (top.tagName === "style") {
        addCSSRules(top.children[0].content);
      }
      // 这里在endtag进行layout 因为需要拿到子元素(简化处理，实际根据属性，正常流可以在startTag处处理)
      layout(top);
      stack.pop();
    }
    currentTextNode = null;
  } else if(token.type == "text"){
    if(currentTextNode == null){
      currentTextNode = {
        type:"text",
        cotent:""
      };
      top.children.push(currentTextNode);
    }
    currentTextNode.content += token.content;
  } 
}



function  data(c) {
  if(c == "<"){
    return tagOpen;
  }else if(c == EOF){
    emit({
      type:"EOF"
    });
    return;
  }else{
    // 文本节点 都emit出去了
    emit({
      type:"text",
      content:c
    });
    return data;
  }
}

function tagOpen(c) {
  if(c == "/"){
    // 这是一个闭合标签
    return endTagOpen;
  }else if(c.match(/^[a-zA-Z]$/)){
    currentToken = {
      type:"startTag",
      tagName:""
    };
    // reconsume c
    return tagName(c);
  }else{
    // 直接emit出去 ?????????????????
    emit({
      type:"text",
      content:c
    });
    return ;
  }
}


function tagName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  }else if(c == "/"){
    return selfClosingStartTag;
  }else if(c.match(/^[a-zA-Z]$/)){
    // 转为小写
    currentToken.tagName += c.toLowerCase();
    return tagName;
  }else if(c == ">"){
    emit(currentToken);
    return data;
  }else {
    // ????????????????
    currentToken.tagName += c;
    return tagName;
  }
}

function beforeAttributeName(c) {
  // 若收到空白符 继续等待属性名
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if(c == "/"||c == ">"||c == EOF) {
    return afterAttributeName(c);
  } else if(c == "="){
    
  }else{
    currentAttribute = {
      name:"",
      value:""
    };
    return attributeName(c);
  }
}

function attributeName(c) {
  if (c.match(/^[\t\n\f ]$/) || c == "/" || c == EOF) {
    return afterAttributeName(c);
  } else if(c == "="){
    return beforeAttributeValue;
  }else if(c == "\u0000"){

  }else if(c == "\"" || c == "'" || c == "<"){

  }else{
    currentAttribute.name += c;
    return attributeName;
  }
}

function beforeAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/) || c == "/" || c == ">"|| c == EOF) {
    return beforeAttributeValue;
  } else if(c == "\""){
    return doubleQuotedAttributeValue;
  }else if(c == "\'"){
    return singleQuotedAttributeValue;
  }else if(c == ">"){
    // return data
  }else{
    return UnquotedAttributeValue(c);
  }
}

function doubleQuotedAttributeValue(c) {
  if(c == "\""){
    currentToken[currentAttribute.name] = currentAttribute.value;
    return afterQuotedAttributeValue;
  }else if(c == "\u0000"){

  }else if(c == "EOF"){

  }else{
    currentAttribute.value += c;
    return doubleQuotedAttributeValue;
  }
}

function singleQuotedAttributeValue(c) {
  // 区分单双引号状态的意义是什么？
  if(c == "\'"){
    currentToken[currentAttribute.name] = currentAttribute.value;
    return afterQuotedAttributeValue;
  }else if(c == "\u0000"){

  }else if(c == "EOF"){

  }else{
    currentAttribute.value+=c;
    // ??????double or single?
    // ??????double or single?
    // ??????double or single?
    return doubleQuotedAttributeValue;
  }
}

function afterQuotedAttributeValue(c) {
  if(c.match(/^[\t\n\f ]$/)){
    return beforeAttributeName;
  }else if(c == "/"){
    return selfClosingStartTag;
  }else if(c == ">"){
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  }else if(c == "EOF"){

  }else{
    // ????????
    currentAttribute.value += c;
    return doubleQuotedAttributeValue;
  }
}

function UnquotedAttributeValue(c) {
  if(c.match(/^[\t\n\f ]$/)){
    currentToken[currentAttribute.name] = currentAttribute.value;
    return beforeAttributeValue;
  }else if(c == "/"){
    currentToken[currentAttribute.name] = currentAttribute.value;
    return selfClosingStartTag;
  }else if(c == ">"){
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data
  }else if(c == "\u0000"){

  }else if(c == "\"" || c == "'" || c == "<" || c == "=" || c == "`"){

  }else if(c == EOF){

  }else{
    currentAttribute.value += c;
    return UnquotedAttributeValue;
  }
}


function selfClosingStartTag(c) {
  if (c == ">") {
    currentToken.isSelfClosing = true;
    emit(currentToken);
    return data;
  } else if(c == EOF) {
    // 答案有误
  } else{

  }
}

function endTagOpen(c) {
  if(c.match(/^[a-zA-Z]$/)){
    currentToken = {
      type : "endTag",
      tagName : ""
    };
    return tagName(c);
  }else if(c == ">"){

  }else if(c == EOF){

  }else {

  }
}

function afterAttributeName(c) {
  if(c.match(/^[\t\n\f ]$/)){
    return afterAttributeName;
  }else if(c == "/"){
    return selfClosingStartTag;
  }else if(c == "="){
    return beforeAttributeValue;
  }else if(c == ">"){
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  }else if(c == "EOF"){

  }else{
    currentToken[currentAttribute.name] = currentAttribute.value;
    currentAttribute = {
      name : "",
      value : ""
    };
    return attributeName(c);
  }
}


module.exports.parseHTML = function parseHTML(html) {
  // console.log(html)
  let state = data;
  for(let c of html){
    state = state(c);
  }
  state = state(EOF);
  return stack[0];
}