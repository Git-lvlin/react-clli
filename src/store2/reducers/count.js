import types from '../actionTypes'
/* eslint-disable import/no-anonymous-default-export */
let initState={
    count:1
}

export default (state=initState,action)=>{
    //深复制
    let newState={...state}
    switch (action.type) {
        case types.COUNT_CHAN:
            newState.count+=action.payload
            break;
        default:
    }
    return newState
}