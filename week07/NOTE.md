# 排版 layout-flex
## 第二步 收集元素进行
## draw
绘制dom

#重学CSS
##CSS总体结构
- @charset
- @import
- rules
  - @media
  - @page
  - rule

##爬取标准
```
var lis = document.getElementById("container").children
var result = [];
for(let li of lis) {
    if(li.getAttribute('data-tag').match(/css/))
        result.push({
            name:li.children[1].innerText,
            url:li.children[1].children[0].href
        })
}
console.log(JSON.stringify(result,null," "))
```
##crawler.js
```
const standards = [
  {
    name: "Requirements for Chinese Text Layout中文排版需求",
    url: "https://www.w3.org/TR/2020/WD-clreq-20200521/",
  },
  {
    name: "CSS Display Module Level 3",
    url: "https://www.w3.org/TR/2020/CR-css-display-3-20200519/",
  },
  {
    name: "CSS Positioned Layout Module Level 3",
    url: "https://www.w3.org/TR/2020/WD-css-position-3-20200519/",
  }
];

let iframe = document.createElement("iframe");
document.body.innerHTML = "";
document.body.appendChild(iframe);

function happen(element, event) {
  return new Promise(function (resolve) {
    let handler = () => {
      resolve();
      // 对iframe的content 进行进一步的操作
      element.removeEventListener(event, handler);
    };
    element.addEventListener(event, handler);
  });
}

void async function () {
  for (let standard of standards) {
    iframe.src = standard.url;
    console.log(standard.name);
    await happen(iframe, "load");
  }
}();

```
