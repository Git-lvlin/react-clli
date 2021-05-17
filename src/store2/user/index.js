/* eslint-disable import/no-anonymous-default-export */
import types from '../actionTypes'
let initState={
    authoritys:{
        token:'',
        power:'',
        obj:{},
        userlist:[]
    }
}

//action只能是一个对象,只能通过dispatch派发过来的
export default (state=initState,action)=>{
    let newState = JSON.parse(JSON.stringify(state)) //要深复制
    switch (action.type) {
        //登录
        case types.SUBMNI_LGOIN:
            //把数据存放在状态管理的initState中
            newState.authoritys.token=action.payload
            break;
        //用户信息
        case types.USER_INFO:
            newState.authoritys.power=action.payload
            break;
        //用户管理列表
        case types.USER_LIST:
            newState.authoritys.userlist=action.payload
            break;
        //文章列表
        case types.ARTICLE_LIST:
            newState.authoritys.obj=action.payload
            
            break;
        default:
            break;
    }
    console.log('newState',newState)
    //把状态管理的数据抛出
    return newState
    
}