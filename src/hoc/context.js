/* eslint-disable import/no-anonymous-default-export */
import React from 'react'
import ThemeCtx from '@/utils/theme'

//高阶组件引用上下文
export default WrapComponent=>{
    return class extends React.Component{
        render(){
            return(
                //使用上下文
                <ThemeCtx.Consumer>
                    {
                        theme=>(
                            <div style={{background:theme.background,color:theme.color}}>
                                <WrapComponent 
                                    {...this.props} 
                                    theme={theme} 
                                />
                            </div>
                        )
                    }
                </ThemeCtx.Consumer>
            )
        }
    }
}

