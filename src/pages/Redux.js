import React from 'react'
//导入生成action的方法
import { countAddOrSub,msgChange } from '../store2/actions'
//引入高阶组件
import { connect } from 'react-redux'

//connect语法：
const mapStateToProps=store=>{
    console.log('store',store)
    //一定要返回对象
    return {
        msg:store.studyReducer.msg,
        count:store.count.count
    }
}
const mapDipatchToProps=dispatch=>{
    //一定要返回对象
    return {
        //action只能是一个对象
        changeMsg:val=>dispatch(msgChange(val)),//派发action
        changeCount:payload=>dispatch(countAddOrSub(payload))
    }
}

export default connect(mapStateToProps,mapDipatchToProps)(
    props=>{
        console.log('props',props)
        let { msg,count }=props
        const click=()=>{
            //{type:'Update',payload:'新的值'}等于action
            props.changeMsg('nb')
        }
        const clickCount=payload=>{
            //{type:'Update',payload:'新的值'}等于action
            props.changeCount(payload)
        }
        return(
            <div>
                <h1>redux</h1>
                <h2>{ msg }</h2>
                <button onClick={click}>修改redux中的牛逼</button>
                <h2>{ count }</h2>
                <button onClick={()=>clickCount(-5)}>自减</button>
                <button onClick={()=>clickCount(5)}>自增</button>
            </div>
        )
    }
) 

// export default connect(store=>(
//     {}
// ),dispatch=>({

// })(props=>{
//     return(
//         <div>另一种写法</div>
//     )
// })
// )



//类组件写法
// @connect(fn,fn)
// class Redux extends React.Component