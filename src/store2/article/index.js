/* eslint-disable import/no-anonymous-default-export */
import types from '../actionTypes'
let initState={
    cates:[],
    obj:{},
    done: 0,
    info:{}
}

export default (state=initState,action)=>{
    let newState=JSON.parse(JSON.stringify(state))//要深复制
    switch (action.type) {
        case types.ARTICLE_CATE:
            newState.cates=action.payload
            break;

        //获取
        case types.LEAVE_LIST:
            newState.obj=action.payload
            break;

        // 新增或编辑
        case types.WRITE_LEAVE_LIST:
            newState.done++
            // 每次新增或编辑完成后，重置info
			newState.info = {}
            break;

        // 新增或编辑
        case types.ARTICLE_ADD:
            newState.done++
            // 每次新增或编辑完成后，重置info
			newState.info = {}
            break;
        default:
            break;
    }
    return newState
}