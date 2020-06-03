# 选择器语法
## 简单选择器
- \*
- div svg|a
- .cls
- \#id
- [attr = value]
- :hover
- ::before

## 复合选择器compound
- <简单选择器><简单选择器><简单选择器>:&的关系 若要||的关系 用选择器列表(selector,selector)实现
- \*或者div必须写在最前面，伪类伪元素在最后面
## 复杂选择器
- <复合选择器><sp><复合选择器>
- <复合选择器>">"<复合选择器>
- <复合选择器>"~"<复合选择器>
- <复合选择器>"+"<复合选择器>
- <复合选择器>"||"<复合选择器>

# 优先级
- 简单选择器计数
优先级可以用一个下面这样的四元组表示：
[内联样式,id, 类\属性\伪类,类型\伪元素]
浏览器可通过配一个较大的N进制来进行计算
S = x \*N^3 +  x\*N^2+ x\*N^1+x（N可以取1000000）
[https://developer.mozilla.org/zh-CN/docs/Web/CSS/Specificity](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Specificity)

#伪类
- 链接/行为
  - :any-link
  - :link :visited
  - :hover
  - :active
  - :focus
  - :target
- 树结构
  - :empty
  - :nth-child()
  - :nth-last-child() (回溯)
  - :first-child :last-child (回溯) :only-child (回溯)

- 伪元素
  - ::before
  - ::after
  - ::first-letter
  - ::first-line (不能设置盒模型系列float等) 与layout有关 需要在layout阶段进行compute css

# 排版
##盒（Box）
1. HTML代码中可以书写开始标签、结束标签，和自封闭标签。
2. 一对起止标签，表示一个元素。
3. DOM树中存储的是元素和其他类型的节点（Node）。
4. CSS选择器选中的是**元素**。
5. CSS选择器选中的元素，在排版时可能产生多个盒。
6. 排版和渲染的基本单位是**盒**。

##正常流排版 normal flow
1. 收集盒进行
2. 计算盒在行中的分布
3. 计算行的分布

###正常流的行模型
1. inline-block baseline有文字时在文字下缘，无文字时移至盒下缘，所以一般给inline-box设置vertical-align:bottom
2. 行高 先保证线对齐 最后算撑开等高度，inline-box vertical-align推荐top bottom middle
3. 每个inline-box 的vertical-align用自己的属性去对齐行的属性.

###float 与 clear
###margin折叠
1. 只发生在交叉轴方向，所以只能在BFC里，不同的BFC之间不会发生
2. 能容纳**正常流**（注意，是normal flow，flex不行）的块级元素基本都会产生BFC，BFC不产生的特例overflow:visible等
3. BFC 不和父元素合并 所以与float 兄弟元素无法合并

###display
1. flex inline-flex （父flex container 子 flex item）
2. table inline-table
3. grid inline-grid
4. block inline-block
5. inline
6. run-in

- 属于block container（内部表现正常流）的只有4
- 属于block level box（外部表现非inline）的有flex table grid block

## Flex排版
1. 收集盒进行
2. 计算盒在主轴方向的排布
3. 计算盒在交叉轴方向的排布

###分行
1. 根据主轴尺寸，把元素分进行，分不进去的进下一行
2. 若设置了no-wrap， 则强行分配进第一行
###计算主轴方向
1. 找出所有Flex元素
2. 把主轴方向的剩余尺寸按比例分配给这些元素
3. 若剩余空间为负数，所有flex元素宽度为0，等比例压缩剩余元素
###计算交叉轴方向
1. 根据每一行中最高元素计算行高
2. 根据行高flex-align和item-align，确定元素具体位置

###属性
- 容器的属性
  - flex-direction
  - flex-wrap
  - flex-flow
  - justify-content
  - align-items
  - align-content

- 项目的属性
  - order
  - flex-grow 
  - flex-shrink 压缩值，默认1
  - flex-basis 基准值，至少占据的空间
  - flex 前三项的和值 默认 0 1 auto
  - align-self






