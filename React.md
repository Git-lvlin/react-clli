# React (class类组件范式、函数式组件Hooks)  /Facebook公司

# class类组件范式

## 基本语法

1. 定义类组件时，必须有render生命周期，其他可没有
2. React类(组件) JSX元素(变量)
3. 如何理解JSX?
	- JSX = Javascript XML 是一种语法糖
	- JSX语法是React开发可选项，但是React官方建议使用
	- JSX语法浏览器不支持，想让他支持需要使用script引入<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>，或者安装@babel/preset-react进行编译，babel会把jsx转换成js调用。
	- JSX元素是对象，也是变量，可以是表达式，不是字符串
	- JSX可以任意嵌套，语法是使用{}包裹JSX子元素
	- JSX中使用{/*注释内容*/}进行注释
	- 在JSX中可以使用表达式(也要用{}包住)，但不能说使用语句(for/if等)
	- JSX元素的动态属性也要使用{}包裹
	- 在JSX中有三个属性发生了变化，需要注意：
		* className 相当于class(但不能写成class)
		* htmlFor 相当于label的for属性
		* tabIndex 相当于tab属性
	- 在JSX中有几个新增属性：
		* key
		* ref
		* dangerouslySetInnerHTML -> 实现v-html功能，将字符串转为html
	- JSX可以防注入攻击(xss)
	- JSX自定义组件名必须以大写字母开头
	- JSX支持属性展开语法{...obj}
	- boolean、undefined、null 无法在JSX中渲染出来，会被忽略
	- JSX是不可变对象，一旦被创建，无法单独改变其元素和属性，当JSX需要更新时，只能生成新的JSX再重新调用render方法金顶DOM渲染，但是react包含虚拟dom，会进行diff运算，因此真实DOM只更新改变了的属性及元素。
	- this.setState()会修改声明式变量，一旦声明式变量发生变化，React系统会对应生成新的虚拟DOM，进而触发DIff运算，找出两个虚拟DOM变化的最小差异，最后将这个最小差异render到DOM上


## 组件

- 如何定义组件？
	1. 类组件
	2. 函数式组件(无状态组件、纯组件PureComponent)

- 两种组件有什么区别？
	1. 类组件要用class关键字来定义，
		* 它有state状态，有生命周期、有this、有ref、有上下文等特性
		* 缺点是运行速度相对较慢、性能较差
	2. 函数式组件使用函数定义(本质上是一个纯函数)。
		* 默认没有类组件那些特性
		* 函数式组件好处是运行速度快，性能高
		* 使用Hooks(v16.8之后) API可以模拟出像类组件一样的众多特性
		* 不能修改入参props，唯一的输入永远获得唯一输出

- 如何进一步理解props？
	1. 在React开发中，props的作用远比state更强大
	2. 在类组件和函数式组件中都默认有props
	3. props是父子组件通信的纽带
	4. props是不能修改的，因为React函数式组件使用的是纯函数，纯函数要求其输入不可修改
	5. props可以传递任何数据类型，还可以传递事件函数、JSX元素(class类不能传)
	6. props和state不能交叉赋值(不能把props的值赋给state)，他们本质上没有任何关联，也不应该被关联
	7. 在最新React中(v15.5以后)，React的props验证只能使用第三方库:prop-types 来完成。

- 如何进一步理解state？
	1. state只能在构造器中定义
	2. state是声明式变量，当它被this.setState()修改时，会生成一个新的虚拟DOM并触发Diff运算，最终依据脏节点更新DOM视图
	3. state的定义发生在构造器中，但是构造器中不能使用this.setState()
	4. 要想改变视图，一定要使用this.setState来修改state，虽然可以直接修改this.state，但是不会生成虚拟DOM触发Diff运算
	5. 重要原则：
		* 修改state变量时，要考虑新值是否由新值计算而来，如果新值由旧值计算而来，需要写成函数返回值的形式，如果不是由旧值计算而来，则直接返回也可以
		* 返回值如果是一个对象，使用箭头函数时返回值不可直接写成{},否则会被当成箭头函数语句的{}，应用({})的形式返回
	6. this.setState()是一个异步函数,但是在定时器(宏任务)内部使用this.setState()时，它是同步的，在微任务中她又是异步的
	7. this.setState({},fn),当setState()这个异步操作完成时，第二个回调函数中可以拿到最新的state(类比Vue中的监听器)
	8. 当多个this.setState()一起调用时，会被react自动合并成一个setState操作，只触发一次render
	9. state是当前组件实例的私有数据，state数据可以向子元素传递，并且只能向子组件传递，不能反向传递，这就是React的单向数据流。

- 几种错误写法和正确写法示例对比(注意写法规范)

```js
[wrong]
this.state.count++

[wrong]
// 如果新值由旧值计算而来，需要写成函数返回值的形式
this.setState({count: this.state.count+1})

[correct]
this.setState(function(state){
	return {count: state.count+1}
})

[wrong]
// 使用箭头函数时返回值不可直接写成{},否则会被当成箭头函数语句的{}，应用({})的形式返回
this.setState(state=>{count: state.count+1})

[correct]
this.setState(state=>(
	{count: state.count+1}
))

[correct]
// this.setState()有两个参数: 返回值和回调函数。
this.setState(state=>({count:state.count+1}),()=>{
	console.log('count已经被修改完成，但diff运算未开始')
	// do something
})

[correct]
//当多个this.setState()一起调用时，会被react自动合并成一个setState操作，只触发一次render,不浪费性能，相同覆盖，不同合并。
this.setState({adName: '',num: 1})
this.setState({adName: '123'})
=> this.setState({adName:'123',num: 1,})

```


## 事件

- class类组件事件绑定
	1. 所有的事件属性名称都要求是小驼峰命名法，并且要以on开头，格式参考： 
		* onMyEvent={}
		* 键盘事件： onKeyUp={}
		* 鼠标事件： onMouseOver={}  onMouseEnter={} 等
	2. 不推荐放在外部定义事件处理器，非要放也不报错
	3. 如果一定要采用ES5的方式写事件处理器，需要使用.bind(this)改变事件处构造函数中this指向
	4. 如果采用ES6的方式绑定事件处理器，不用再考虑this指向问题
	5. 用ES5方式绑定事件时，事件处理器的最后一个参数永远都是事件对象
	6. 用ES6方式绑定事件时，需要手动传递事件对象，否则取不到
	7. 无论是ES5还是ES6阻止默认事件<只能>通过e.preventDefault()实现
	8. 无论是ES5还是ES6阻止冒泡<只能>通过e.stopPropagation()实现
	9. 如果想监听特殊事件(enter、滚轮事件等)都要通过事件对象来识别处理
	10. React事件绑定支持自定义传参，可以传递任何JS数据类型
	11. 自定义事件也要遵循onMyEvent这种事件命名方式

- hooks函数式组件事件绑定
	1. 无需使用this
	2. 事件处理器自定义参数时需要手动传值，且参数一一对应
	3. 推荐使用

## 列表渲染

- 语法基础：
* JSX支持数组渲染(数组中的元素可以是基本数据类型、JSX元素)
```js
render() {
	return(
		{
			[
				<div key='1'>123</div>,
				<Child key='2' />
				'hello word',
				10000,
				true,  //看不到
				null   //看不到
			]
		}
	)
}
```

- 各种列表list渲染写法
* 原则上当被渲染的列表需要进行数据处理时，常常建议封装自定义render方法来渲染列表(见第三种写法)
* 列表渲染一定要加key(JSX支持数组渲染，一定要加key，且key必须加在数组的元素上，在哪map就加在哪)
* 列表渲染官方建议使用map方法实现(但map方法不是唯一可选项)
* 无论怎样只要返回一个由需要元素组成的的数组即可
* 注意： 当我们在用map渲染数组时，对原数组进行处理，是一种浅复制，尽量避免同一组数据多次处理。
```js
<!-- 第一种写法(推荐写法，经常用到) -->
// list.map返回值是一个数组
{
	list.map(ele=>(
		<div key={ele.id}>
			<span>{ele.name}</span>
		</div>
	))
}

<!-- 第二种写法(不推荐) -->
{
	list.map(ele=>{
		ele.id = ele.id+'??'
		return <div key={ele.id}>
			<span>{ele.name}</span>
		</div>
	})
}

<!-- 第三种写法(推荐写法，经常用到) -->
// 定义函数
renderList() {
	return list.map(ele=>{
		ele.id = ele.id+'??'
		return <div key={ele.id}>
			<span>{ele.name}</span>
		</div>
	})
}
// 使用：
{this.renderList()}

<!-- 第四种写法 -->
render() {
	const arr = []
	list.map(ele=>{
		arr.push(
			<div key={ele.id}>
				<span>{ele.name}</span>
			</div>
		)
	})
	return (
		{arr}
	)
}

```

## 生命周期

- react生命周期3-2-1
- 第一阶段3
* constructor -> render -> componentDIdMount
- 第二阶段2
* [shouldComponentUpdate] -> render -> componentDidUpdate
- 第三阶段1
* componentWillUnmount

### 特殊生命周期

- render()
		* render()这个生命周期在装载阶段和更新阶段都会运行，在第阶段一生命周期中执行顺序为constructor->render->ComponentDidMount
		* render() { return 随意 }
		* render是类组件中唯一的一个必须要有的生命周期
		* 这个render函数必须要有返回值，return的內容只要满足JSX语法即可，字符串、false、null、子元素、嵌套等都行
		* 当render方法返回一个null时，不影响生命周期的正常运行，componentDIdMount也会运行
		* return之前，可以做任意的业务逻辑，但是不能使用this.setState，setState会调用render，相互调用形成死循环
		* 每当setState修改声明式变量时，都会触发diff运算，进而触发render方法重新调用
		* render函数的return返回的jsx默认只能是单一根节点，但是使用碎片<React.Fragment>的语法支持下，可以返回多个根节点，理论上类似于返回一个数组，示例代码如下：
```js
render() {
	return (
		//碎片
		<React.Fragment>
			<div>
				<h1>123</h1>
			</div>
			<div>
				<h1>122</h1>
			</div>
		</React.Fragment>
	)
}

<!-- 简写方式 -->
render() {
	return (
		<>
			<div>
				<h1>123</h1>
			</div>
			<div>
				<h1>122</h1>
			</div>
		</>
	)
}
```

### 第一阶段：装载阶段(3)

1. constructor()
	* 当React组件实例化时，是第一个运行的生命周期
	* super(props)必须是第一行代码，表示调用父类的构造器
	* 在这个生命周期中，不能使用this.setState()
	* 在这个生命周期中，不能使用副作用(调接口、dom操作、定时器等、长连接等)
	* 在这个生命周期中，不能把props和state交叉赋值运算

2. render()

3. ComponentDidMount()
	* 相当于是vue中的mounted()
	* 表示DOM结构在浏览器中渲染已完成
	* 在这里可以调用任何副作用(调接口定时器、DOM操作、长连接等)
	* 可以使用this.setState()

### 第二阶段：更新阶段(3)

1. shouldComponentUpdate(nextProps,nextState)//参数为新值
	* 相当于一个开关，如果它返回true，则更新机制正常执行，如果返回false则更新机制停止
	* 在vue中没有，所以react面试经常问
	* 存在的意义为可以用于性能优化，用于精细地控制声明式变量的更新问题，判断哪些变量变化时需要进行render渲染并返回true，哪些变量变化时不需要render渲染并返回false，但是不常用(基本用不到)，最新解决方案是使用PureComponent(函数式组件)他会默认解决这个问题

2. render()

3. componentDidUpdate()
	* 表示DOM结构渲染更新已完成，只发生在更新阶段
	* 相当于vue中的updates
	* 在这里可以执行某些大多数副作用，但不建议
	* 在这里可以使用this.setState()，但是需要有终止条件判断，(比如判断父组件传的值是否和子组件中接收参数的值相等，如果不相等就更新数据，相同不做操作),但仅供参考，不建议使用


### 第三阶段：卸载阶段(1)

1. componentWillUnmount()
	* 相当于vue中的beforeDestroy()
	* 一般在这里清除定时器、长连接等其他占用内存的变量，一定不可以使用this.setState

## 条件渲染

1. 使用 && / ! 实现单条件渲染
	- 相当于v-if
	- { bol && <div>123</div>}
2. 使用 三目运算符 实现条件渲染
	- 相当于v-if/v-else
	- { bol1 ? <div>11</div> : <div>22</div>}
3. 使用 if / switch 语句实现多条件渲染 
	- 相当于v-if/v-else-if/v-else
	- { //一般封装成一个方法再执行,改成switch语句也可
			if(idx==1) {
				res = <div>1</div>
			}else if(idx==2) {
				res = <div>2</div>
			}else{
				res = <div>3</div>
			}
		}
4. 使用动态 class / style 实现条件渲染，
	- 相当于v-show
	- {
			<div 
				className={ show,color } 
				//多个动态class，字符串拼接(show+' '+color)也可
			>
				动态class
			</div>
			<div 
				style={{ display: (this.bol ? 'block':'none') }}
			>
				动态style
			</div>
		}

## 表单绑定
1. 受控表单
	- 表单的value/checked属性由state控制
	- <input 
			type='text' 
			value={ this.state.school } 
			onChange={ e=>this.setState({school:e.target.value}) } 
		/>

2. 非受控表单
	- 表单的value/checked属性不由state控制
	- <input id='name' type='text' />  //dom操作，不建议
	- <input ref='name' type='text' />  //dom操作，不建议
	- <input type='text' onInput={e=>pass=e.target.value} />//不建议
	- <input type='text' defaultValue={this.state.age} onInput={e=>this.setState({age:e.target.value})}  //state只用来存值，不能实际控制value

* 原则上，在react开发中，尽可能的使用受控表单，但是有一个例外，文件上传表单<input style="file">只能使用非受控表单

## 组合 (特别重要)
- 组合 vs 继承
	* 组合和继承都是组件复用的思想，但是react官方推荐使用组合来实现组件复用。
- 组合
	* 语法基础：使用props.children、自定义属性可以传递React元素(render props)
```js
const FancyBorder = props => {
  (
    <div>
      {props.children}
    </div>
  );
}
const WelcomeDialog = () => {
  (
    <FancyBorder color="blue">
      <h1>
        Welcome
      </h1>
    </FancyBorder>
  );
}
```
- 继承
	* 语法基础：
```js
 class Model extends React.Component {}  //基类
 class DeleteModel extends Model {}  //新功能类
 class ConfirmModel extends Model {}
```

## 上下文 (特别重要)
- 什么是上下文？
	* 一种无需手动给每层添加props，就可以在组件树间进行数据传递的方法。
	* 自上而下的向组件树中注入数据
	* 注意：上下文的消费者(实际上就是哪些被上下文包裹的组件)中不能修改上下文
	* 和数据共享不同，注入数据后无法更改，不可进行双向绑定。
	* 路由、状态管理等工具一般是基于上下文实现的
	* 三步走：创建、注入、使用

- 上下文在哪些第三方库会用到？
	* React-Router、Mobx、Redux

- 创建react上下文
```js
import React from 'react'
<!-- 创建上下文对象 -->
const ThemeContext = React.createContext()
const thems = [
	{
		color:'black',
		background: 'black'
	}
]
export {thems}
export default ThemeContext
```
- 根组件引入
```js
import ThemeContext,{thems} from '../utils/theme'
class App extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
		//value向所有react组件树注入数据
			<ThemeContext.provider value={thems[0]}> 
				<div>
					<Test />
				</div>
			</ThemeContext.provider>
		)
	}
}
```
- 子组件使用
1. 写法1
```js
import ThemeContext from '../utils/theme'
class TestChild extends React.Component {
		.....
}
TestChild.contextType = ThemeContext
<!-- 之后可以可在this中使用上下文传入的数据 -->
```
2. 写法2(推荐)
```js
import ThemeContext from '../utils/theme'
class TestChild extends React.Component {
		render() {
			return (
				<!-- Consumer组件导入数据 -->
				<ThemeContext.Consumer>
					{
						(thems)=>( //thems即上下文传入的数据
							<div style={{color:thems.color}}>
								<h2>上下文样式</h2>
							</div>
						)
					}
				</ ThemeContext.Consumer>
			)
		}
}
export default TestChild
```

## 高阶组件 (特别重要)
- 什么是高阶组件(HOC)？
	* React中用于复用组件业务逻辑的一种高级技巧，是一种设计模式(类比Vue中的mixin)
	* 高阶组件(或高阶函数)本质上是一个纯函数，
	* 作用：高阶组件也被称之为容器组件(和UI组件区分)，是用于修饰、装饰UI组件的(联想修饰器)
	* 注意：需要手动保留`多个高阶组件`修饰的props，即每次都<WrapComponent {...this.props} point='point' />,否则props会被覆盖
	* 一般一个高阶组件只复用一个可以复用的逻辑
	* 工作中可用于权限管理、全局api注入

- 高阶组件的语法：
```
<!-- 接收一个UI组件作为参数，返回一个新组件 -->
hocFn(UIComponent){return NewUIComponnet}
```

- 支持装饰器语法的插件(babel插件)
* 安装后可以使用@修饰，代替a(b(c(test)))这样的高阶组件嵌套
[babel修饰器](https://www.babeljs.cn/docs/babel-plugin-proposal-decorators)
```js
@babel/plugin-proposal-decorators -D
@babel/plugin-proposal-class-properties
```
* 直接使用会报错，因为eslint无法检测(读不懂)，因此需要安装使用@babel/eslint-parser,以使得装饰器可以被检测
```js
cnpm i eslint @babel/core @babel/eslint-parser -D
// eslinttrc.js
module.exports = {
  parser: "@babel/eslint-parser",
};
```

- 高阶组件进阶
* 使用函数传值生成不同的高阶组件，可实现权限管理role
* 思路：获取权限信息，即role字段 => 判断roleArr中是否包含该role => 根据返回值判断返回的组件代码
```js
import React from 'react'
// 写法一
export default roleArr => WrapComponent => {
	return class extends React.Component {
		render() {
			return (
				<WrapComponent />
			)
		}
	}
}
// 写法二
export default function role(roleArr) {
	return function (WrapComponent) {
		return class extends React.Component {
			render() {
				return (
					<WrapComponent />
				)
			}
		}
	}
}
```
```js
// 高阶组件使用
// 修饰器方式
@role(['admin','editor'])
class testComponent ...
// 普通方式
role(['admin','editor'])(testComponent)
```

## 数据类型检查 (非必须)
- 安装cnpm i prop-types -S
- [使用propTypes类型检查](https://react.docschina.org/docs/typechecking-with-proptypes.html)

# HOOK
- 两个API： useState:使用state  useEffect:使用副作用
	
- useState
	* 作用：用于定义声明式变量，模拟类组件中的state
	* 语法：const [msg,useMsg] = useState('初始值')
	* useState在定义声明式变量时必须要有初始值
	* 要使用set*系列方法改变该变量，不建议直接改变变量，且注意不要用++进行变量自增
	
- useEffect
	* 作用：模拟类组件中生命周期的特性
	* 副作用：可以理解为凡是和视图渲染没有直接关系的(或不是生成JSX的业务)都是副作用
	* 副作用包括： 定时器、调接口、长连接、DOM操作、第三方库初始化等
	* 语法：useEffect(()=>{return ()=>{}},[])
	* 一个副作用对应一个useEffect

- 代码示例：
```js
export default props => {
	// useState
	// 尽量用const,可看作定义一个声明式变量count,使用setCount改变该变量，
	const [count,setCount] = useState(0) // []里名字可以随便写，不是硬性规定
	const [msg,useMsg] = useState('初始值') //必须要有初始值
	const [show,useShow] = useState(true)
	const [num,setNum] = useState(1000)
	
	// useEffect
	let timer = null
	useEffect(()=>{ // 开启定时器计数
		// 类似于生命周期的Mounted
		timer = setInterval(()=>{
			setNum(num+10)
		},1000)
		return ()=>{ //结束函数，类似生命周期的结束destroyed
			clearIntercal(timer) //一定要关闭定时器
		}
	},[num]) //第二个参数如果是空数组表示useEffect中无论是否改变state触发整体重新更新，都只触发一次，如果不是空数组，如[count,msg] 那么count发生每次变化时，useEffect都会重新运行,类似于生命周期的updated
	
	useEffect(()=>{ //修改文档标题
		document.title = '123'
		return undefined
	},[]) // 加上空数组后，不随着整体更新而更新,只执行一次
	
	const changeCount = type =>{
		if(type=='add') {
			setCount(count+1)
		}else{
			setCount(count-1)
		}
	}
	return (
		<div>
			<h1>{count}</h1>
			<button onClick={()=>changeCount('add')}>自增</button>
			<button onClick={()=>changeCount('sub')}>自减</button>
			<input
				type="text"
				value={msg}
				onChange={e=>setMsg(e.target.value)}
			/>
			{ show && <h3>一行文字</h3> }
			<button onClick={()=>setshow(show?false:true)}>显示/隐藏</button>
			
			<h2>{num}</h2>
		</div>
	)
}
// ()=>changeCount() 初始化时不会运行，changeCount() 初始化时就会执行
```


# 状态管理： Flux(最初)  /Facebook公司 =>  Mobx / Redux / Vuex

## 原理/理念：状态提升(解决数据共享问题)
- 最近父组件：所选择对象的最近共同父组件
- 父子组件通信(怎么做？)：
	* 找到这几个组件的最近父组件，将需要共享的状态数据定义在父组件中
	* 通过父组件传来并放在props上的onChange来向父组件传递数据，如onChange(e)
	* 子组件传给父组件数据时通过e(事件对象)传递，如e.target.message
- 爷孙组件，父当中转，解构传值<Father {...props}>，将属性原封不动传给Child
```js
import React from 'react'

//要发送数据的组件
class TChild extends React.Component{
     constructor(props){
        super(props)
        this.state={
            t:0 //传给父组件的数据
        }
    }
    change(e){
        let { onChange }=this.props
        console.log(e)
        this.setState({t:e.target.value},()=>{
            //因为是异步的，所以要在回调函数里把值传给父组件
            // this.props.onChange(this.state.t)
            //摄氏度转为华氏温度
            let celsius=Number((this.state.t * 9 / 5) + 32)
            //可以解决父组件没有给事件的问题
            onChange && onChange(celsius)
        })
        
    }
    render(){
        let { t }=this.state
        return(
        <div>
            <h3>摄氏温度：</h3>
            <input
                type="text"
                value={t}
                onChange={e=>this.change(e)}
            />
        </div>
    )
    }
}
//要接收数据的组件
const Fchild=props=>(//接收TChild传给父组件，再由父组件传过来的数据的组件
    <div>
        <h1>华氏温度：</h1>
        <p>{props.tf}</p>
        <hr/>
    </div>
)

const Uncle=props=>{
    return (
        // <Fchild tf={props.tf}/>
        //更灵活的写法
        <Fchild {...props}/>
    )
}
//要保存共享状态数据的父组件
export default class StateLift extends React.Component{
    constructor(props){
        super(props)
        this.state={
            tf:0  //根据状态提升的理念，需要共享的状态
        }
    }
    change(e){
        //e表示子组件传过来的数据
        console.log('TChild传过来的数据',e)
        this.setState({tf:e})
    }
    render(){
        let { tf }=this.state
        return (
            <div>
              <h1>状态提升</h1>
            <hr/>
            <TChild onChange={(e)=>this.change(e)} />
            <hr/>
            {/* <Fchild tf={tf}/> */}
            <Uncle tf={tf} />
            </div>
            
        )
    }
}
```

## Mobx / Redux

### Mobx
- 状态管理实质上是数据管理， Mobx / Redux / Vuex 都是Flux思想指导下的一种具体的解决方案
- 状态管理工具：可预测状态的数据容器。
- 在React技术栈中可使用Mobx / Redux ，一般情况下，小项目可以考虑使用 mobx6 & mobx-react7， 如果是大项目，建议使用 redux & react-redux
- 原则：在React规范中，一切外部数据都要从props进入组件，所以几乎一定要使用状态管理工具。
- 安装：cnpm i mobx -S  &&  cnpm i mobx-react -S
- 使用mobx：
```js
// makeObservable & makeAutoObservable
// makeObservable是有选择的将某些特定的状态数据变成被观察者，而makeAutoObservable将所有状态数据都变成观察者

<!-- (1)[mobx6]makeAutoObservable定义子store： -->

import { makeAutoObservable } from 'mobx'
class TodoStore {
	constructor() {
		makeAutoObservable(this)  //一定要加this
	}
	// 需要共享的状态数据 理解为vuex中的state
	msg = 'hello mobx'
	
	// 理解为vuex中的mutations和actions, 以及setters方法
	changeMsg(payload) {
		this.msg = payload
	}
	// 理解为Vuex中的getters，当msg发生变化时，更新getMsgLength，重新计算
	get getMsgLength() {
		return this.msg.length
	}
}

 <!-- (2)[mobx6]makeObservable定义子store： -->
 
// action ,computed ,observable 三者为标识符
// action 表示把一个方法变成action，它可以直接修改observable变量
// observable 用于把一个变量变成可观察的，当他变化时，观察者中可以自动更新
// computed 用于get操作，就是计算属性，当它所关联的observable变化时，会重新计算
import { makeObservable, action, computed, observable } from 'mobx'
class TodoStore {
	constructor() {
		makeObservable(this,{//一定要加this
			msg: observable,
			changeMsg: action,
			getMsgLength: computed
		})  
	}
	// 需要共享的状态数据 理解为vuex中的state
	msg = 'hello mobx'
	
	// 理解为vuex中的mutations和actions, 以及setters方法
	changeMsg(payload) {
		this.msg = payload
	}
	// 理解为Vuex中的getters，当msg发生变化时，更新getMsgLength，重新计算
	get getMsgLength() {
		this.doConsole()
		return this.msg.length
	}
	// Mobx中的业务方法，不参与actiion和计算属性
	doConsole() {
		console.log('123')
	}
}

<!-- (3)[mobx5装饰器写法]定义子store写法： -->

import { action, computed, observable } from 'mobx'
class TodoStore {
	// 需要共享的状态数据 理解为vuex中的state
	@observable
	msg = 'hello mobx'
	
	// 理解为vuex中的mutations和actions, 以及setters方法
	@action
	changeMsg(payload) {
		this.msg = payload
	}
	
	// 理解为Vuex中的getters，当msg发生变化时，更新getMsgLength，重新计算
	@computed
	get getMsgLength() {
		this.doConsole()
		return this.msg.length
	}
	
	// Modx中的业务方法，不参与actiion和计算属性
	doConsole() {
		console.log('123')
	}
}

<!-- 定义Store集合抛出 -->

class Store {
	constructor() {
		//对多个子module进行实例化，集成在Store类中
		this.todo = new TodoStore() 
		// new TodoStore() 调用TodoStore类里的constructor方法，即观察TodoStore中共享的数据的变化，使得TodoStore类的方法变量可以在实例对象中使用
	}
}
export default new Store()  //抛出实例化后的Store
```

- 使用mobx-react：
```js
->App.js
<!-- mobx集成、注入 -->
import store from '@/store'
import {Provider} from 'mobx-react'  //作用：给react注入数据

// 注入
...
render() {
	return(
		// 包裹即可
		<Provider store={store}>  // store不是固定名称，可随意,也可以用{...store} 注入所有，那么inject的时候就可以直接取出子store如：inject('todo')()
			...
		</Provider>
	)
}
...

-> 组件.js
<!-- 调用注入的数据,使用observer观察者监听状态数据变化 -->
import {injet, observer} from 'mobx-react'

// observer(UIComponnet) 作用是把React组件变成观察者,UIComponnet是组件名
// 特点：当mobx中被观察的数据发生变化时，观察者自动更新

// inject('store')() 作用是注入mobx中的状态数据，'store'是注入时使用的名称
// 特点：一旦注入成功，在props上就可以直接访问，用逗号隔开可以注入多个，例如：inject('abc','def')()

// 使用语法：inject('store')(observer(UIComponnet)) // 注意顺序，先变成观察者再注入数据

export default inject('store')(observer(props=>{
	console.log(props.store)  //即可调用store中的属性方法
	let {todo} = props.store
	todo.changeMsg(payload) // 调用方法传入store
})

```

### Redux
#### 面试题与描述
- 如果是大项目，建议使用 redux & react-redux
- Redux应对面试(3-3-3) [流程图片参考](https://redux.js.org/tutorials/essentials/part-1-overview-concepts)
	* 三个api：
		1. createStore
		2. combineReducers
		3. applyMiddleware: 添加使用中间件
	* 三个工作流程中的核心概念
		1. Store
		2. Action(Dispatch)
		3. View
	* 三个Store的特征
		1. Store是单一数据源
		2. Store是只读的
		3. Store只能通过纯函数Reducer进行修改
- Redux是一个可预测状态的数据容器，是基于Flux思想而开源的项目
- 技术栈： Redux / React-Redux / Redux-thunk / Redux-Saga ....
- 安装 cnpm i redux -S && cnpm i react-redux -S 
- Redux Toolkit 自动生成工具，可选，但是不好用
- Redux-thunk中间件做了什么？(面试重点)
	* 解决了Redux不支持异步action的问题
	* thunk这个中间件，在View->Store之间起作用，它用于判断action是不是function，如果是就构建一个假的plian object发送给Store，事实上什么都没做，然后再执行一次dispatch。
	* 因此用于支持异步action的生成器方法，必须return一个function
	* Redux-Saga也可起到相同作用
- 多个中间件一起使用时要注意什么？
	* const store = createStore(rootReducer,applyMiddleware(thunk)(abc)(...))  applyMiddleware返回值就是它本身，层层执行嵌套过于复杂
	* 可以使用 import {compose} from 'redux'
		const store = createStore(
		rootReducer,
		compose(applyMiddleware(thunk),applyMiddleware(abc))
	)

#### 使用redux

1. 高阶组件写法
```js
<!-- store创建 -->
-> src/reduxstore/index.js

import { createStore } from 'redux'

let initState = {
	msg: 'hello'
}

// reducer是一个纯函数,传入一个值，返回一个处理后的值，唯一的输入得到唯一的输出
// reducer将传入的值进行拆分，根据拆分出来的不同action.type对参数进行不同处理
// 在Redux中，只能用reducer来修改store(state)
// 深度理解action： 传回的数据action必须是一个Plain Object，否则会报错，具体格式是{ type:'' , payload: ''}(参数key、value可自定义) ，它【只能】通过dispatch(action)派发到store中来

function reducer(state=initState,action){
	// 参数1：初始化state，注意state是一个形参，需要赋初始值，可用es6语法state=initState 参数2：为组件传回的数据action(必须是一个对象，否则会报错)

	let newState = {...state}  
	//由于传回的是一个对象，因此需要进行深复制
	// Object.assign({},state) -> es5深复制,层级深不可用
	// {...state}  -> es6深复制，层级深时不可用
	// JSON.parse(JSON.stringfy()) -> 终极解法或者使用相关插件
	
	switch (action.type) { //为什么用switch语句? -> 比if else效率高
		case 'UPDATE':
			// do something
			newState.msg = action.payload
			break;
		default:
			// do something
	}
	return newState
}  

// createStore语法 
// createStore(reducer, {}, middlewares)  
// 参数2(根store状态)、3(中间件)两者可选
const store = createStore(reducer)
export default store

<!-- store全局挂载 -->
-> src/App.js
// 在组件挂载store
import {Provider} from 'react-redux'
import store from '@/store'

...
return(
	<Provider store={store}>  // 这里和mobx不同，必须使用store作为属性、参数
		<div className='App'> 
			<Component />
		</div>
	</Provider>
)
...

<!-- store组件中使用 -->
-> components.js

import {connect} from 'react-redux'
// connect语法：connect(fn1,fn2)(UIComponent)

const mapStateToProps = (store)=> {  //类比vue中mapState，获取到state
	return {
		msg: store.msg
	}
}

const mapDispatchToProps = (dispatch)=> { //类比vue中mapActions，获取到actions
	return {
		changeMsg: (action)=>dispatch(action) //使用dispatch传回数据action
	}
}

...
export default connect(mapStateToProps,mapDispatchToProps)(props => {
	let {msg} = props  //可在props中取到数据和方法
	const click = ()=>{
		const action = {type: 'UPDATE', payload: 'newmsg'}
		props.changeMsg(action)
	}
	return (
		<div>
			<h2>{msg}</h2>
			<button onClick={click}>修改redux中的msg</button>
		</div>
	)
})
...

```

2. 组件内使用react-redux Hooks写法,API更方便，可替代connect高阶组件写法(推荐)，甚至用不到props
```js
<!-- store组件中使用 -->
-> components.js

import { useSelector, useDispatch } from 'react-redux'
// useSelector作用类同useState，以及vue中的mapState
...
export default props => {
	
	const msg = useSelector(store=>store.msg) //返回什么就什么
	const dispatch = useDispatch()
	
	const click = ()=>{
		const action = {type: 'UPDATE', payload: 'newmsg'}
		dispatch(action)
	}
	return (
		<div>
			<h2>{msg}</h2>
			<button onClick={click}>修改redux中的msg</button>
		</div>
	)
}
...
```

3. reducer拆分：(拆解switch语句)
```js
<!-- reducer拆分 -->
-> store/reducers/Reducer.js
let initState = {msg: 'hello'}
const Reducer = (state=initState,action) {
	switch (action.type) {
		case '':
			...
			break;
		defalut:
			...
	}
}
export default Reducer

<!-- reducer合并 -->
-> store/index.js

import {combineReducers} from 'redux'

import studyReducer from './reducers/Reducer'

const rootReducer = combineReducers({
	study: studyReducer,
	... //其他
})
const store = createStore(rootReducer,[{msg:'12346'}])
export default store


<!-- store组件中使用 -->
-> components.js

import { useSelector, useDispatch } from 'react-redux'
// useSelector作用类同useState，以及vue中的mapState
...
export default props => {
	
	const msg = useSelector(store=>store.study.msg) //子reducer传的数据
	const rootMsg = useSelector(store=>store.msg) // 根reducer传的数据(?待解决)
	const dispatch = useDispatch() 
	
	const click = ()=>{
		const action = {type: 'UPDATE', payload: 'newmsg'}
		dispatch(action)
	}
	return (
		<div>
			<h2>{msg}</h2>
			<button onClick={click}>修改redux中的msg</button>
		</div>
	)
}
```

4. action生成器封装(action多页面复用)
```js
-> store/actions/index.js

import types from '@/store/actionTypes.js'

function msgAction(payload) {
	return {
		type: 'MSG_CHANGE', // ->也要封装->types.MSG_CAHNGE
		payload
	}
}
export {
	msgAction
}

// 目的：替换 action = {type, payload}

<!-- hooks改法 -->
import {msgAction} from 'store/actions/index.js'
export default props => {
	const msg = useSelector(store=>store.study.msg) //子reducer传的数据
	const dispatch = useDispatch() 
	
	const click = ()=>{
		// const action = {type: 'UPDATE', payload: 'newmsg'}
		dispatch(msgAction('newmsg'))
	}
	return (
		<div>
			<h2>{msg}</h2>
			<button onClick={click}>修改redux中的msg</button>
		</div>
	)
}

```

5. actionTypes封装(避免action.type重名)
```js
-> store/actionTypes.js

const COUNT_CHANGE = 'COUNT_CHANGE'
const MSG_CAHNGE = 'MSG_CAHNGE'

export default {
	COUNT_CHANGE,
	MSG_CAHNGE
}

// import使用常量即可
```

6. 异步action(调接口问题) 观看顺序 1067->1009
```js
--> store/actions/index.js

import fetchMusic from '@/utils/api'
<!-- 错误写法 -->
const getMusic = payload => {
	// 触发调接口
	fetchMusic(payload).then(res=>{
		
	})
	// 当异步数据res回来时,触发另一个action
	return {
		type: types.GET_QQ_MUSIC
		payload: res
	}
}

<!-- 正确写法 -->
// 在组件初始化时 dispatch(getMusic({})) 这样写时dispatch返回的是一个function而不是plain action object，因此会报错
// 异步数据要使用两次dispatch，返回的才是plain action object
// 自己解决： 使用if判断，当第一次调用dispatch时返回的是函数时，再次调用dispatch，返回plain action object
// 使用中间件： cnpm i redux-thunk -S && cnpm i redux-saga -S
// -> store/index.js
// import thunk from 'redux-thunk'
// import {applyMiddleware} from 'redux'
// const store = createStore(rootReducer,applyMiddleware(thunk))
// export default store

const getMusic = payload => {
	return function(dispath) {
		// 触发调接口，使用axios对应api
		fetchMusic(payload).then(res=>{
			dispatch({
				type: types.GET_QQ_MUSIC
				payload: res
			})
		})
	}
}


--> store/reducers/Reducer.js

let initState ={
	list: []
}
const Reducer = (state=initState,action) {
	let newState = {...state}
	switch (action.type) {
		case types.GET_QQ_MUSIC:
			state.list = action.patload
			break;
		defalut:
			...
	}
}

--> components.js

//在Redux中，dispatch是一个同步方法，它负责向Store中派发plain action object
// Redux只支持同步的action，dispatch内部是一个异步代码时会报错
// 解决方法：使用中间件，见<!-- 正确写法 1026:10 -->

useEffect(()=>{
	// 页面初始化
	// 触发获取后端数据的action
	dispatch(getMusic(params))
	return undefined
},[])

```




# 路由：  React-Router   /React-Rrainning公司

## 基本规则
- 安装插件 cnpm i react-router-dom -S //代码中需要
- <switch></switch> 套 <Route /> 匹配路由规则更快,且有重复的时只加载第一个，且两者只能直接套，中间不能套其他东西(如<div></div>)
- NavLink可以用to链接到对应地址，默认为a标签且无法更改
- 设置重定向:<Redirect from='/*' to='/jsx' />

## 代码分割 (相当于vue-router中的路由懒加载)
- 作用：用异步方式引入组件，提升应用程序的运行速度，本质上是一种性能优化
- 技术核心点：异步动态import组件，Webpack的代码分割技术
- React-Router中使用CodeSpliting实现[代码分割](https://reactrouter.com/web/guides/code-splitting)
	* 安装@babel/plugin-syntax-dynamic-import -D 以及@loadable/component -S 后即可使用loadable()代替lazy()进行代码分割,即可以使用异步方式引入组件
，且内部包含组件懒加载功能
	* 组件懒加载：首次渲染时只渲染需要的组件，其他组件不进行渲染

## route的use*
- withRouter 真正让props上有路由
- useHistory 模拟路由 => h=useHistory() => h.push('/abc')
- 动态路由 useParams拿路由动态参数 
```
/abc/:id =>路由id参数
import {userParams} from 'react-router-dom'
const p=userParams()
{p.id} =>路由id参数
```
- useLocation => 类似于vue中$route 可以拿到?后面的东西
- useRef 在函数式组件中，默认没有ref特性，使用useRef可以获得ref特性
```
import {useRef} from 'react-router-dom'
const aRef = useRef(null) => 定义使用
<div ref={aRef} />  => react元素
aRef.current.focus() =>对aRef.current(ref实例对象)进行dom操作
```


# UI框架 ： Ant-Design / Ant-Mobile

## Ant-Design
- 只支持less，不支持sass
- [sass设置参考](https://ant.design/docs/react/customize-theme-cn)
- antd antv echarts
- echarts 生成器函数


# 脚手架 ： create-react-app / dva / umi
1. create-react-app [中文文档](https://create-react-app.bootcss.com/)
- 安装：
```
cnpm i create-react-app -g
```
- 创建工程：
```
create-react-app react-admin  //初始化
```
- 执行暴露：
```
// 注意：暴露操作必须在一切操作之前，要求先提交代码到git(不一定必须是远程，本地也可以)再暴露，操作之后，永久暴露无法恢复(未修改可以直接暴露)
git init
git add .
git commit -m 'first'
npm run eject  
y 
```
- 优化思路：
1. 端口	-> start.js  49:10
2. less -> webpack.config.js  510:10 
	* 注意：一定要放在file-loader之前！！！！  
	* [方法二](https://www.jianshu.com/p/bb5886f25511?utm_campaign=haruki&utm_content=note&utm_medium=reader_share&utm_source=qq)
	* 方法二见webpack.config-test1.js代码
3. @ -> webpack.config.js  304:10
4. appIndexJs -> paths.js  60:10
5. publicPath -> webpack.config.js   198:10
6. proxy代理 -> webpackDevServer.config.js  104:5

# JS语法 ： ES6 / TypeScript
- 

# 其他
1. editorconfig --取消eslint空格报错
2. 一般要使用state里的变量属性，先从state解构出来
	* let {name} = this.state
3. 搭建环境包含路由、状态管理、hooks
4. antv antpro参考