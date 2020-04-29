## 表达式 Expression
Grammar-Tree vs Priority：运算符的优先级由**表达式生成树**来实现的，JS中运算符按照优先级高低分以下几类：

####Member及同级运算 
属性、成员访问，返回Reference类型
  - a.b
  - a[b]
  - foo\`string\` : 函数后跟templete的用法，模板按分变量与字符串分解后传入函数foo中
  - super.b ：调用父类属性
  - super['b']
  - new.target：判断函数是否由new调用
  - new Foo() ： 带() 的优先级更高
####New及同级运算 
 - new Foo
####Call及同级运算
  - foo()
  - super() ：执行父类构造函数
  - foo()['b'] ： 为了保证new运算的正确性，降低了优先级
  - foo().b
  - foo()\`abc\`

Left Handside & Right Handside
Member、New、Call又被称作Left Handside Expression，其他则成为Right Handside Expression，按照等号（=）左右进行划分。LHE在运行时上应为reference类型，下面几类为RHE

####Update自增运算
注意中间不允许有LineTerminator
  - a++
  - a--
  - --a
  - ++a
####Unary单目运算
  - delete a.b
  - void foo() ：后面无论是任何值均返回undefined，void 0是返回undefined的最佳实践
  - typeof a : 注意typeof与js运行时对类型的规定不一致 typeof null --> object、typeof function(){} -->function
  - +a
  - -a
  - ~a：按位取反
  - !a ：取非
  - await a
####Exponental 
- ** ：唯一右结合运算符
####Multiplicative
-  \* / % 
####Additive
- \+ \-
####Shift移位运算
- << >> >>>
####Relationship比较运算
- <>  <= >=  instanceof  in
####Equality
- == 
- !=
- ===
- !==
####Bitwise
- & ^ |
####Logical
具有短路特性
- &&
- ||
####Conditional
- ? : JS中的三目运算同样具有短路逻辑，true?foo1:foo2 时foo1不调用，false?foo1:foo2 时foo2不调用，是完全合法的if else表达式版本，且可以无限嵌套
####Comma
- , : , 类似于表达式版本的分号

### 类型转换
![boxing.jpg](https://upload-images.jianshu.io/upload_images/8747904-46ee79c618c03ff4.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
###装拆箱
- Boxing
Number String Symbol Boolean 四个类分别对应JS中的四个类型，可用于强制类型转换、调用构造器等（返回对象）
eg:注意Number() 与 new Number()不一样，直接调用用于强转，new运算则返回一个对象 
- Unboxing
对象拆箱主要使用 [Symbol.toPrimitive] | valueOf、toString




Statement
 
Completion Record
[[type]] : normal, break, continue, return, or throw
[[value]] : Types
[[target]] : label

简单语句
- ExpressionStatement -> a =1 +2;
- EmptyStatement -> ;
- DebuggerStatement debugger;
- ThrowStatement  throw a;
- ContinueStatement continue label1;
- BreakStatement break label;
- ReturnStatement return 1+2;

复合语句

BlockStatement
[[type]] : 一般是normal，若执行遇到非normal则中断后续执行 
[[value]] : --
[[target]] : --

Iteration
- while()
- do while()
- for( ; ; )
- for( in )
- for( of ) 对应iterator机制 
   for of => Iterator => Generator/Array
- for await( of )
 
LebelledStatement
IterationStatement
ContinueStatement
BreakStatement
SwitchStatement  

try{
}catch(){
}finally{
}

声明
FunctionDeclaration
GeneratorDeclaration
AsyncFuncrionDeclaration
AsyncGeneratorDeclaration
VariableStatement
ClassDeclaration
LexicalDeclaration

Object API/Grammar
- {} . [] Object.defineProperty
- Object.create/Object.setPrototypeOf/Object.getPrototypeOf
- new/class/extends (尽量不要和上面的方式混用)
- new/function/prototype (deprecated)

Function Object
[[call]]


#### JS标准里有哪些对象是我们无法实现出来的，都有哪些特性？
- Bound Function Exotic Objects(pg127)

A bound function wraps another function object. A bound function has a [[Call]] internal method and may have a [[Construct]] internal method, Calling a bound function generally results in a call of its wrapped function.

Bound function objects do not have the internal slots of ECMAScript function objects ([[Environment]],[[FormalParameters]],[[FunctionKind]],[[ECMAScriptCode]],[[ConstructorKind]]，[[Realm]]，[[ScriptOrModule]]，[ThisMode]]，[[Strict]]，[[HomeObject]]，[[SourceText]] )(pg117). Instead they have the internal slots like [[BoundTargetFunction]]，[[BoundThis]]， [[BoundArguments]]

- Array Exotic Objects(pg128)

Array object gives special treatment to array index.Every Array object has a non-configurable "length"property whose value is always a nonnegative integer less than 2^32. 

- String Exotic Objects(pg131)

A String object is an exotic object that encapsulates a String value and exposes virtual integer-indexed data properties corresponding to the individual code unit elements of the String value.

- Arguments Exotic Objects(pg133)

Most ECMAScript functions make an arguments object available to their code. Depending upon the characteristics of the function definition, its arguments object is either an ordinary object or an arguments exotic object. An arguments exotic object is an exotic object whose array index properties map to the formal parameters bindings of an invocation of its associated ECMAScript function.

- Integer-Indexed Exotic Objects(pg138)


- Module Namespace Exotic Objects(pg142)

A module namespace object is an exotic object that exposes the bindings exported from an ECMAScript Module

- Immutable Prototype Exotic Objects(pg145)

An immutable prototype exotic object is an exotic object that has a [[Prototype]] internal slot that will not change once it is initialized.
