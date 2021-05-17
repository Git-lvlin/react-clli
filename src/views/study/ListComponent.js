import React from 'react'


export default class ListComponent extends React.Component{

     constructor(props){
        super(props)
        //只能在这里定义state
        this.state={
            list:[
                {id:1,task:'睡觉'},
                {id:2,task:'美女'},
                {id:3,task:'篮球'},
                {id:4,task:'唱跳'},
            ]
        }
    }
     render(){
         let { list }=this.state
        return (
            <div>
                <h1>测试列表</h1>
                {/* 列表渲染的JSX语法基础 */}
                {/* eslint-disable */}
                {
                    [
                        <div key="1">999</div>,
                        '牛逼kluas',
                         100,
                         true,
                         null,
                        <div key="2">888</div>,
                        <div key="3">777</div>
                    ]
                }
                <hr/>
                {/* eslint-enable */}
                {/* 第一种写法（推荐） */}
                {
                    list.map(ele=>(
                        <div key={ele.id}>
                            <span>{ele.id}</span>
                            <span>{ele.task}</span>
                        </div>
                    ))
                }
                <hr/>
                {/* 第二种方法（不推荐） */}
                {
                    list.map(ele=>{
                        return <div key={ele.id}>
                                    <span>{ele.id}</span>
                                    <span>{ele.task}</span>
                                </div>
                    })
                }
                {/* 第三种写法 */}
                {}
            </div>
        )
        }
}
