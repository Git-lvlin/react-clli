import React from 'react'


export default class Condition extends React.Component{
    constructor(props){
        super(props)
        this.state={
            boll:true,
            bol2:true,
            color:'red',
            show:'block',
            display:'block'
        }
    }
    render(){
        let { boll,bol2,color,show,display }=this.state
        return(
            <div>
                <h1>条件渲染</h1>
                <hr/>
                {
                    boll && <p>我是可有可无的</p>
                }
                <button onClick={()=>this.setState(state=>({boll:!state.boll}))}>显示隐藏</button>
                {
                    bol2 ? <div>1111</div>:<div>2222</div>
                }
                <button 
                  onClick={()=>this.setState({color:['red','green','blue'][Math.floor(Math.random()*3)]})}
                >切换颜色</button>
                <div className={color}>动态class的样式</div>
                <hr/>


                {/* show */}
                <h2 className={show,color}>牛逼</h2>
                <button 
                onClick={()=>this.setState(state=>({show:(state.show=='block'?'none':'block')}))}
                >show</button>

                {/* 样式 */}
                <h2 style={{color:'blue',fontSize:'30px',display}}>样式</h2>
                <button 
                onClick={()=>this.setState(state=>({display:(state.display=='block'?'none':'block')}))}
                >display</button>
            </div>
        )
    }
}