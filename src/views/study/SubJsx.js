import React from 'react'


const a=<a href="http://baidu.com">牛逼</a>

 const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>现在是 {new Date().toLocaleTimeString()}.</h2>
    </div>
  )


class Subjsx extends React.Component{
    constructor(props){
        super(props)
        //声明式变量(变化时视图跟着变化,单向绑定)
        this.state={
            list:[
                {id:1,task:'睡觉'},
                {id:2,task:'美女'},
                {id:3,task:'篮球'},
                {id:4,task:'唱跳'},
            ],
            task:''
        }
    }
    add(e){
        console.log(e)
        if(e.keyCode==13){
            this.setState({
                list:[...this.state.list,{id:Date.now(),task:this.state.task}],
                task:''
            })
        }
    }
    render(){
        return (
            <div>

            { element }
            {/* { this.state.list } */}
            <input type="text" 
            value={this.state.task}
            onKeyUp={(e)=>this.add(e)}
            onChange={(e)=>this.setState({task: e.target.value})}
              />
            <h1>jsxbsddd</h1>
            {
                this.state.list.map(ele=>{
                    <div key={ele.id}>
                    <span>{ele.id}</span>
                    <span>{ele.task}</span>
                    </div>
                })
            }

            </div>
        )
    }
}



export default Subjsx