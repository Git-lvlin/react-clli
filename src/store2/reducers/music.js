/* eslint-disable import/no-anonymous-default-export */
import types from '../actionTypes'

let initState={
    list:[]
}

export default (state=initState,action)=>{
    // console.log(action)
    //深复制
    let newState={...state}
    switch (action.type) {
        case types.GET_QQ_MUSIC:
            newState.list=action.payload//后端调接口返回的数组
            break;
        default:
    }
    return newState
}