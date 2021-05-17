/* eslint-disable import/no-anonymous-default-export */
//子store
import types from '../actionTypes'
let initState={//只读的，不能直接修改，要用一个副本(深复制),不然不更新
    msg:'牛逼'
}
export default (state=initState,action)=>{

        //action只能是一个对象,只能通过dispatch派发过来的
        // console.log('来自view中的action',action)
        //深复制
        let newState={...state}
        // let newState=Object.assign({},state)
    
        switch(action.type){
            case types.STUDY_UPDATE:  
            // console.log(action.payload)
            newState.msg=action.payload
            break;
            default:
        }
        return newState
}

