import React from 'react'
// import '@/assets/css/todolist.css'


export default class Todolist extends React.Component{
    constructor(props){
        super(props)
        this.state={
            list:[],
            name:'',
            list2:[]
        }
    }
    add(ev){//添加
        let { list,name }=this.state
        if(ev.keyCode==13){
            this.setState({
               list: [...list,{id:Date.now(),task: name }]
            })
            this.setState({//回车清空表单
                name:''
            })
        } 
    }
    remove(idx,e){//删除
       let { list }=this.state
       list.splice(idx,1)
       console.log(e)
       this.setState({
           list:[...list],
       })
    }
    remove2(idx,e){//删除
       let { list2 }=this.state
       list2.splice(idx,1)
       console.log(e)
       this.setState({
           list2:[...list2]
       })
    }
    edit(ele,idx,e){//编辑
        e.target.className='txt hide'
        e.target.nextSibling.className="editinput show"
        e.target.nextSibling.value=e.target.innerHTML
    }
    swap(ele,idx,e){//进行转为完成
       let { list2 }=this.state
       e.preventDefault()
       this.remove(idx,e)
       this.setState({
           list2:[...list2,{id:Date.now(),task:ele.task}]
       })
       console.log(e)
    }
    swap2(ele,idx,e){//完成转为进行
       let { list }=this.state
       e.preventDefault()
       this.remove2(idx,e)
       this.setState({
           list:[...list,{id:Date.now(),task:ele.task}]
       })
       console.log(e)
    }
    outblur(e){//失焦
        console.log(e.target.value);
       e.target.className='editinput hide'
       e.target.previousSibling.className="txt show"
       e.target.previousSibling.innerHTML=e.target.value
    }

    //拖拽
    dragstart(e,idx){
        e.dataTransfer.setData('key', idx)
    }
    //投放触发
    drop(idx,e){
        let { list }=this.state
        let ids = e.dataTransfer.getData('key')
        let temp
        //拖拽目标与投放目标进行交换
        temp=list[idx]
        list[idx]=list[ids]
        list[ids]=temp
        this.setState({list:[...list]})
    }

    render(){
        let { list,name,list2 }=this.state
        return (
            <div>
            <header>
                <section>
                    {/* <form id="form"> */}
                        <label htmlFor="title">ToDoList</label>
                        <input 
                            type="text"
                            id="title"
                            name="title"
                            placeholder="添加ToDo"
                            required="required"
                            value={name}
                            onChange={e=>this.setState({name:e.target.value})}
                            onKeyUp={e=>this.add(e)}
                        />
                    {/* </form> */}
                </section>
            </header>
            <section>
                <h2>正在进行 <span id="todocount">{list.length}</span></h2>
                {
                    list.map((ele,idx)=>(
                        <ol 
                            id="todolist"
                            className="demo-box"
                            key={idx} 
                        >
                           <li
                            className="box"
                            draggable='true'
                            onDragStart={e=>this.dragstart(e,idx)}
                            onDragOver={e => e.preventDefault()}
                            onDrop={e=>this.drop(idx,e)}
                            >
                             <input type="checkbox" onClick={e=>this.swap(ele,idx,e)}/>
                             <p onClick={e=>{this.edit(ele,idx,e)}} className="txt">{ele.task}</p>
                             {/* 期望' onChange '监听器是一个函数，而不是
                             到一个' string '类型的值 */}
                             <input type="text"
                                onChange={e=>this.setState({task:e.target.value})}
                                onBlur={e=>{this.outblur(e)}}
                                className="editinput hide" 
                            />
                             <a onClick={e=>this.remove(idx,e)}>-</a>
                           </li>
                        </ol>
                    ))
                }
                <h2>已经完成 <span id="donecount">{list2.length}</span></h2>
                {
                    list2.map((ele,idx)=>(
                        <ul id="donelist" className="demo-box" key={idx}>
                           <li>
                             <input 
                                type="checkbox"
                                checked="checked"
                                onClick={e=>this.swap2(ele,idx,e)}
                                onChange={e=>this.setState({task:e.target.value})}
                             />
                             <p onClick={e=>{this.edit(ele,idx,e)}} className="txt">{ele.task}</p>
                             <input 
                                type="text"
                                onChange={e=>this.setState({task:e.target.value})}
                                onBlur={e=>{this.outblur(e)}}
                                className="editinput hide"
                            />
                             <a onClick={e=>this.remove2(idx,e)}>-</a>
                           </li>
                        </ul>
                    ))
                }
            </section>
            <footer>
                Copyright &copy; 2014 todolist.cn <a href="">clear</a>
            </footer>
            </div>
        )
    }
}