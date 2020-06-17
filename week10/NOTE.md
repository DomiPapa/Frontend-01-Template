#Range API
比节点级操作更为精细的API，无需遵循DOM层级关系，等效HTML代码区段，可具体到文本节点的某个文字前后，可与鼠标selection事件配合，getRangeAt来获取range
```
// example1
var range = new Range()
range.setStart(element,9)
range.setEnd(element,4)
// example2
var range = document.getSection().getRangeAt(0);
```
- Range.setStart()
- Range.setEnd()
快捷操作
- Range.setStartBefore()
- Range.setStartAfter()
- Range.setEndBefore()
- Range.setEndAfter()
- Range.selectNode()
- Range.selectNodeContents()
- ...其他一些API

#CSSOM(......)
与css相关的api，用于操作css
- document.styleSheets
- 

##视图部分
窗口api
滚动api

下面有个行盒的地方走神了

#编程训练TicTacToe
- 棋盘：3*3
- 双方分别持有圆圈和叉两种棋子
- 双方交替落子
- 率先连成三子的直线一方获胜

##数据结构
可以使用一维数组、二维数组、map来表示棋盘数据结构
```
let pattern = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
]

let pattern = [ 
    0,0,0
    0,0,0
    0,0,0    
]
```
