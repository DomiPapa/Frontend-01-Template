回首页
新建文集
 新建文章
 在下方新建文章
已保存
前端训练营第九周学习总结
 发布文章
#动画
##Animation
- @keyframes定义
- animation: 使用
```
@keyframes mykf
{
    from { background: red; }
    to {background: yellow; }
}
div
{
    animation: mykf 5s infinite;
}
```
###属性
The animation shorthand property applies an animation between styles.
- animation-name 时间曲线
- animation-duration 动画时长
- animation-timing-function 动画的时间曲线
- animation-delay 时间开始前的延迟
- animation-iteration-count 动画的播放次数
- animation-direction 动画的方向
```
@keyframes mykf
{
    0% { top: 0; transition:top ease }
    50% { top: 30; transition:top ease-in }
    75% { top: 10; transition:top ease-out }
    100% { top: 0; transition:top linear }
}
```
##Transition
优点是可精细控制每个属性的变换
- transition-property 要变换的属性
- transition-duration 变换的时长
- transition-timing-function 时间曲线
- transition-delay 延迟

##Timing fuction
css timing fuction 只有cubic-bezier 是以时间为横轴，被变换属性百分比为纵轴的函数曲线，有起始点、终点和两个控制点。

系统推荐特例曲线有一下几个
- ease 位移类 (最常用 推荐)
- linear
- ease-in 退出型
- ease-out 进入型
- ease-in-out 

cubic-bezier曲线可以拟合

#渲染与颜色
##CMYK与RGB
##HSL与HSV

#形状
- border
- box-shadow
- border-radius

data uri + svg 搞定一切矢量图 做bg

css作业

body.getComputedStyle

#HTML
quot
amp
lt
gt
##语义

#DOM
dom树、事件、range

节点：文本节点 元素节点
##导航类操作
- parentNode
- childNodes
- firstChild
- lastChild
- nextSibling
- previousSibling

##修改类操作
- appendChild
- insertBefore
- removeChild
- replaceChild

##重点
1.所有的dom元素默认只有一个父元素，不能被插入到两个位置，如果需要把某元素从a位置换到b位置，不需要手动将其从a位置摘除，直接插入到b位置即可；
2.childNodes是living的collection，实时根据dom操作而变化；

##高级操作
- compareDocumentPosition: 是一个用于比较两个节点中关系的函数
- contains:
- isEqualNode:
- isSameNode:
- cloneNode:复制一个节点，如果传入参数true，则会连同子元素拷贝

##事件
- 


 
