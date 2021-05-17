import React from 'react'

// function box(){//不推荐在外面写
//     console.log('点击事件')
// }

//类组件事件绑定
export class EventComponent extends React.Component{
    boxClick(box1,box2,ev){
        //  console.log('点击事件',this)//this是undefine
        //  this.setState(state=>({count:count+1}))
        console.log('ev',ev)//事件对象
        //阻止默认事件
        ev.preventDefault()
        //阻止事件传播
        ev.stopPropagation()

        
    }
    enter(ev){
        let { name }=this.state//声明式变量
        if(ev.keyCode==13){
        console.log('ev',ev)
        console.log('按下了回车')
        console.log('name',name)
        }
    }
    constructor(props){
        super(props)
        //只能在这里定义state
        this.state={
            count:1,
            num:1,
            name:''
        }
        this.box=this.boxClick.bind(this,'1',this.state.count)//这里也可以改变this指向,也可以传参，最古老的写法
    }
    render(){
        let { count,name }=this.state
        return (
            <div>
                <h1>测试事件</h1>
                <h2></h2>
                {/* this指向当前组件实例 */}
                <button onClick={this.boxClick.bind(this,'2',count)}>点击1</button>
                <button onClick={this.box}>点击2</button>
                {/* 箭头函数也可以令this指向当前组件实例 */}
                <button onClick={(e)=>this.boxClick(3,count,e)}>点击3</button>
                <br/>
                <hr/>

                <input 
                    type="text"
                    value={name}
                    onChange={e=>this.setState({name:e.target.value})} 
                    onKeyUp={e=>this.enter(e)}
                />
            </div>
        )
    }
}


//函数式组件的事件绑定(现在推荐无状态组件)

const Child=props=>(
    <button onClick={()=>props.onBox()}>我也是个无状态组件</button>
)

export default function EventComponent(){
    //阻止默认事件,阻止事件传播，键盘事件，都在这里写
    const boxClick=(box1,box2,e)=>{
        console.log('box1',box1)
        console.log('box2',box2)
        console.log('事件点击',e)
    }
   const handle=()=>{
        console.log('自定义事件的方法')
    }
    return (
        <div>
            <h1>函数式事件绑定</h1>
            {/* 自定义传参 ,用事件对象时i，一定要用箭头函数调用 */}
            <button onClick={(e)=>boxClick(1,true,e)}>点击1</button>
            {/* 自定义事件，也要遵从 onMyEvent的事件命名方式*/}
            <Child onBox={handle} />
        </div>
    )
}