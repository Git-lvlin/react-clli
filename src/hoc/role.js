/* eslint-disable import/no-anonymous-default-export */
import React from 'react'
//权限管理
//粗粒度的权限管理，页面级别的权限管理
//细粒度的权限管理，页面元素级别的权限管理

//roleArr相当于@role(['admin','editor'])里面的数组
export default roleArr=>WrapComponent=>{
    return class extends React.Component{
        constructor(props){
            super(props)
            this.state={
                role:''
            }
        }
        componentDidMount(){
            //从用户信息中拿到role字段
            this.setState({role:'admin'})
        }
        render(){
            let { role }=this.state
            console.log(roleArr)
            const flag=roleArr.includes(role)//判断高阶组件里有没有这个用户权限
            return(
                <div>
                  {
                      flag?<WrapComponent {...this.props} role="admin" />:<h1>没有权限访问</h1>
                  }
                </div>
            )
        }
    }
}


// export default function role(roleArr){
//     return function (WrapComponent){
//         return class extends React.Component{
//             render(){
//                 return(
//                     <WrapComponent/>
//                 )
//             }
//         }
//     }
// }