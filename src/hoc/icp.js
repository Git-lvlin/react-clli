/* eslint-disable import/no-anonymous-default-export */
import React from 'react'


export default WrapComponent=>{
    return class extends React.Component{
        renderICP(){//凡是被icp修饰的组件都有备案号
            return (<div>备案号:10086</div>)
        }
        render(){
            console.log('props',this.props)//父组件传过来的颜色数据
            return (
                // {...this.props}解决一个组件被多个高阶组件修饰覆盖的问题,保留props
                <>
                <WrapComponent {...this.props} icp='icp' />
                {this.renderICP()}
                </>
            )
        }
    }
}