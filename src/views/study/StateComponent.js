import React from 'react'

//只能在构造器中定义state
export default class StateComponent extends React.Component{
    constructor(props){
        super(props)
        //只能在这里定义state
        this.state={
            count:1,
            num:1
        }
    }
    add(){
        // let { count }=this.state
        //错误的写法
        // this.state.count++  //可以修改，但是不会触发diff运算,视图不会改变
        // console.log('改变state',this.state)
        // this.setState({ count：++count })//当修改state变量，如果新值是由旧值计算而来，不能这样写

        //正确的写法
        //state是上一帧的旧值
        //当修改state变量，如果新值是由旧值计算而来，应该这样写
        setTimeout(() => {
            this.setState((state)=>{//这里面是同步的，在外面是异步的
                return {
                    count:state.count+1//++state.count是在修改它，不能这样，要加1
                }
            })
        console.log('改变state',this.state)
        }, 2000);

        //正确的写法
        //第二个参数是一个回调函数
        // this.setState(state=>({count:state.count+1}),()=>{
        //     console.log('count已经被修改完成',this.state)
        //     //count修改完成的回调
        // })

        //正确的写法
        this.setState({count:100,num:10})
        this.setState({count:200,num:20})
        this.setState({count:300}) //count最后是300
        this.setState({num:999})//num最后是999
    }
    render(){
        let { count,num }=this.state
        console.log('render被调用的次数')//setState设置了三次，只调用了一次
        return (
            <div>
              <h1>State</h1>
              <h1>{count}</h1>
              <h1>{ num}</h1>
              <button onClick={ ()=>this.add() }>自增</button>
            </div>
        )
    }
}