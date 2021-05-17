import React from 'react'


export default class Lifecycle extends React.Component{
    //constructor()
    //当React组件实列化时，是第一个运行的生命周期
    //在这个生命周期中，不能使用this.setState()
    //在这个生命周期，不能使用副作用（调接口、dom操作、定时器、长连接）
    //不能把props和state交叉赋值
    constructor(props){
        //super(props)必须是第一行代码，表示调用父类的构造器
        super(props)
        this.state={
            count:1,
            num:1
        }
        console.log('----------constructor')
    }

    //componentDidMount()
    //相当于vue中的mounted（）
    //它表示dom结构在浏览器中渲染已完成
    //在这里，可以使用任何的副作用（调接口、dom操作、定时器、长连接）
    //在这里，可以使用this.setState()
    componentDidMount(){
        console.log('----------componentDidMount')
    }

    //shouldComponentUpadte()
    //它相当于是一个开关，如果它返回true，则更新机制正常执行，如果返回false则更新机制停止
    //在vue中是没有的，所以React面试经常问到
    //它存在的意义，可以用于性能优化,但是现在基本用不到，最新的解决方案是使用PureComponent
    //理论上这个生命周期的作用：用于精细的控制声明式变量的更新问题，如果被变化的声明式变量参与了视图渲染则返回true；如果被变化的声明式变量没有直接或间接参与视图渲染则返回false，以减少diff运算
    shouldComponentUpdate(nextProps,nextState){
        let { count}=this.state
        console.log('----------shouldComponentUpdate')
        if(nextState.count!==count){//修改后执行diff运算
            return true
        }else{//不修改就结束
            return false
        }
        
    }

    //componentDidUpdate()
    //相当于vue中的update（）
    //它表示dom结构渲染更新已完成，只发生在更新阶段
    //在这里可以执行大多数的副作用，但是不建议
    //在这里，可以使用this.setState(),但是需要加条件判断(终止条件)
    componentDidUpdate(){
        console.log('----------componentDidUpdate')
        //反例,仅供参考,尽量不要这样干
        if(this.state.count<10){
            setTimeout(() => {
                this.setState(state=>({count:state.count+1}))
            }, 1000);
        }
    }

    //componentWillUnmount()
    //相对于是vue中的beforeDestroy()
    //一般在这里清除定时器，长连接等其它占用内存的变量
    //在这里一定不可以使用this.setState()
    componentWillUnmount(){
        console.log('----------componentWillUnmount')
    }

    //render()
    //是类组件唯一的一个必须要有的生命周期
    //这个render函数要有return，返回结果只要满足jsx语法都可以
    //它的return返回jsx默认只能是单一根节点，但是在Fragment（碎片）的支持下，可以返回多个兄弟节点
    //Fragment碎片的写法：<React.Fragment></React.Fragment>，简写<></>
    //在return之前，可以做任意的业务逻辑(但是不能使用this.setState())
    //每当setState修改声明式变量，会触发diff运算，进而触发render方法重新调用
    //render()这个生命周期，在装载阶段和更新阶段都会运行
    //当render（）返回null时，不影响生命周期的运行
    render(){
        let { count,num }=this.state
        return (
            //可以返回多个根节点
            <React.Fragment>
                {[
                <div key={1}>
                    <h1>测试生命周期1</h1>
                </div>,
                <div key={2}>
                    <h1>测试生命周期2</h1>
                </div>,
                '牛逼牛逼'
                ]}
                <h1>{count}</h1>
                <button onClick={()=>this.setState({count:count+1})}>count自增</button>
                <button onClick={()=>this.setState({num:num+1})}>num自增</button>
            </React.Fragment>
        )
    }
}