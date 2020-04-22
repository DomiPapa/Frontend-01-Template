#编程语言通识
##相关概念
**乔姆斯基谱系**：计算机科学中刻画形式文法表达能力的一个分类谱系，包括0型（无限制文法）、1型（上下文相关文法）、2型（上下文无关文法）、3型（正则文法）等四型文法； 
**巴斯克范式**：一种用于表示上下文无关文法的语言，用来描述计算机语言语法的符号集。其规定是推导规则（产生式）的集合，写为：<符号>::=<使用符号的表达式>
**BNF理解乔姆斯基谱系**:  
0型：? ::= ?   
1型： ?<A>? ::= ?<B>?&nbsp;&nbsp;--例如-->{ get a{return 1}, get:1 }
2型：<A> ::= ?&nbsp;&nbsp;--例如-->2\*\*1\*\*2
3型：<A> ::= <A>?&nbsp;&nbsp;不能是  <A> ::= ?<A>
**图灵完备性：**在可计算性理论里，如果一系列操作数据的规则（如指令集、编程语言、细胞自动机）可以用来模拟单带图灵机，那么它是图灵完全的。if 、while 、goto
**类型系统：**
- 动态类型系统与静态类型系统
- 强类型与弱类型
- 复合类型 ：结构体、函数签名等
- 子类型：逆变/协变 
**一般命令式编程系统结构**
- Atom : Identifier、Literal
- Expression: Atom、Operator、Punctuator
- Statement: Expression、Keyword、Punctuator
- Structure:Function、Class、Process、Namespace、Program
- Program:Program、Module、Package、Library



#案例
#####正数
<Number> ::= "0" | "1" | "2" | ... | "9"&nbsp;&nbsp;--正则-->  /0|[1-9][0-9]*/
#####十进制数
<DecimalNumber> ::= "0" | (("1" | "2" | ...... | "9")<Number>*)
#####括号表达式
<PrimaryExpression> ::= <DecimalNumber> | 
  "(" <LogicalExpression> ")"
#####乘/除法表达式
<MultiplicativeExpression> ::= <PrimaryExpression> | 
  <MultiplicativeExpression> "*" <PrimaryExpression> |
  <MultiplicativeExpression> "/" <PrimaryExpression> 
#####加减法表达式
<AdditiveExpression> ::= <MultiplicativeExpression> |  
  <AdditiveExpression> "+" <MultiplicativeExpression> |
  <AdditiveExpression> "-" <MultiplicativeExpression>  
#####逻辑表达式
<LogicalExpression> ::= <AdditiveExpression> |  
  <LogicalExpression> "||" <AdditiveExpression> |
  <LogicalExpression> "&&" <AdditiveExpression>  

#JS |词法、类型
##相关概念
**字符编码：**字集码是把字符集中的字符编码为指定集合中某一对象（例如：比特模式、自然数序列、8 位元组或者电脉冲），以便文本在计算机中存储和通过通信网络的传递。
**Unicode：**又称万国码、国际码、统一码、单一码。是计算机科学领域里的一项业界标准。它对世界上大部分的文字系统进行了整理、编码。需要注意的是，Unicode 只是一个符号集，它只规定了符号的二进制代码，却没有规定这个二进制代码应该如何存储。而UTF-8 是在互联网上使用最广的一种 Unicode 的实现方式，另外还有UTF-16、UTF-32等。
**JS的InputElement:**WhiteSpace、LineTerminator、Comment、Token、Punctuator。
