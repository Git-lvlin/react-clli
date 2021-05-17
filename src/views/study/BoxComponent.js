import React from 'react'
//可以写成
// import React，{Component} from 'react'


//类组件
//组件名可以省略
export default class BoxComponent extends React.Component{
    //构造器
    constructor(props){//也是一个生命周期
        //调用父类(父组件)构造器,继承父类的东西,必须是第一行代码
        super(props)
        this.state={
            count:1
        }
    }
    componentDidMount(){//生命周期
        console.log('this',this)
    }
    render(){
        //尽可能把各种变量进行解构赋值
        let { count }=this.state
        return (
            <div>
               <h1>测试组件</h1>
               <h1>{ count }</h1>
            </div>
        )
    }
}

//函数式组件(无状态组件)
//本质上是一个纯函数
//没有this
//不能修改入参，唯一的输入永远得到唯一的输出
//props是父组件给的，不能修改
// export default function BoxComponent(props){
//     // console.log('props',props)//是一个{}
//     return (
//         <div>
//             <h1>函数式组件</h1>
//         </div>
//     )
// }

//另一种函数写法
// export default ()=>(
//     <div>
//         <h1>函数式组件</h1>
//     </div>
// )


//写逻辑的写法
// export default ()=>{
//   return(
//         <div>
//             <h1>函数式组件</h1>
//         </div>
//     )
// }
    