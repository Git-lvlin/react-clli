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