import React from 'react'
//这是两个高阶组件
//observer(观察者):它的作用是把React组件变成观察者，当mobx中被观察的数据发生变化时，观察者自动更新
//inject('store')(UIconponent)它的作用是注入mobx中的状态数据
//特点：一旦注入成功，在props上就可以直接访问
import {inject,observer} from 'mobx-react'

//按需注入
export default inject('todo')(observer(//先观察变化在注入
    props=>{
    let {todo}=props
    const update=()=>{
        //触发状态管理的action方法
        todo.changeMsg('修改mobx数据~~')
    }
    return(
        <div>
            <h1>mobx</h1>
            <p>{todo.msg}</p>
            <p>msg的长度：{todo.getMsgLength}</p>
            <button onClick={update}>修改msg</button>
        </div>
    )
})) 