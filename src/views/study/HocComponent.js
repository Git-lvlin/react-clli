//高阶组件
import React from 'react'

import { point,icp,role,config } from '@/hoc'

//写法三：装饰器写法
//eslint读取不到@，要安装@babel/eslint-parser
// @context
@icp
@point
@role(['admin','editor'])//权限管理
@config
class HocComponent extends React.Component{
    handle(){
        let { role,dialog }=this.props
        console.log('role',role)
        dialog.alert({title:role})
    }
    render(){
        console.log('this',this)
        return (
            <div>
                <h1>高阶组件123</h1>
                <button onClick={()=>this.handle()}>元素级别的权限管理</button>
            </div>
        )
    }
}
export default HocComponent
