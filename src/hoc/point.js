//埋点,在组件中调用某个api
//高阶组件
import React from 'react'

//高阶组件（高阶函数）接收一个UI组件(React) 作为入参
function point(WrapComponent){
    return class extends React.Component{
        componentDidMount(){
            //调用埋点api
            console.log('埋点api已调用')
        }
        render(){
            return(
                // {...this.props}解决一个组件被多个高阶组件修饰覆盖的问题,保留props
                <WrapComponent {...this.props} point='point'/>
            )

        }
    }
}

export default point