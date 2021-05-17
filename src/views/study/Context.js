import React from 'react'
//引入上下文对象
import ThemeCtx from '@/utils/theme.js'

//使用上下文的第一种写法
// class Context extends React.Component{
//     render(){
//         console.log('this',this)
//         return (
//             <div>
//                 <h1>上下文</h1>
//             </div>
//         )
//     }
// }

// Context.contextType=ThemeCtx
// export default Context

export default class Context extends React.Component{
    // changeTheme(){
    //     this.setState({theme:themes[Math.floor(Math.random()*3)]})
    // }
    render(){
        return(
            // 使用上下文
            <ThemeCtx.Consumer>
               {
                (theme)=>(
                    <div 
                        style={{background:theme.background,color:theme.color}}
                    >
                        {/* <button onClick={()=>this.changeTheme()}>改变颜色</button> */}
                      <h1>上下文</h1>
                    </div>
                )
               }
            </ThemeCtx.Consumer>
        )
    }
}