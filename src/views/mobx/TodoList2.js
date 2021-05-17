import React,{useState} from 'react'
import {inject,observer} from 'mobx-react'

export default inject('todo')(observer(
    props=>{
        console.log('检查是否注入成功',props)
        let {todo}=props
        const [task,setTask]=useState('')
        //添加
        const add=()=>{
            const payload={
                type:'add',
                data:{
                    id:Date.now(),
                    task
                }
            }
            console.log(todo.list)
            todo.updateList(payload)
        }
        //删除
        const dele=(ele)=>{
            const payload={
                type:'del',
                ele
            }
             todo.updateList(payload)
        }

        //编辑
        const edit=(ele,e)=>{
            const payload={
                type:'edit',
                data:{
                    id:ele.id,
                    task:e.target.value
                }
            }
            todo.updateList(payload)
        }

        return(
            <div>
                <h1>TodoList</h1>
                <hr/>
                <input type="text" value={task} onChange={e=>setTask(e.target.value)} />
                <button onClick={add}>添加</button>
                <hr/>
                {
                    todo.list.map(ele=>{//map循环一定要分清楚是“{}”还是“（）”
                        return (<div key={ele.id}>
                            <span>{ele.id}</span>
                            <input type="text" value={ele.task} onChange={e=>edit(ele,e)} />
                            <button onClick={()=>dele(ele)}>删除</button>
                        </div>)
                    })
                }
            </div>
        )
    }
)) 