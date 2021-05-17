//根store

import { createStore,combineReducers,applyMiddleware} from 'redux'
//thunk用于解决Redux不支持异步action的问题
//thunk这个中间件，在View - Store之间起作用，它用于判断action是不是函数
//如果是就定义一个对象，不是就dispatch给store
//异步action，实际上发生了两次dispatch，第一次Redux什么都没做，第二次才是真正后端数据放入Redux中

//createStore语法：createStore（reducer,{},middlewares）


// let initState={//只读的，不能直接修改，要用一个副本(深复制),不然不更新
//     msg:'牛逼'
// }
// //reducer是一个纯函数，唯一的输入得到唯一的输出
// //在Redux中，只能使用reducer来修改store（state）
// function reducer(state=initState,action){
//     //action只能是一个对象,只能通过dispatch派发过来的
//     console.log('来自view中的action',action)
//     //深复制
//     let newState={...state}
//     // let newState=Object.assign({},state)

//     switch(action.type){
//         case'Update':  
//         newState.msg=action.payload
//         break;
//         default:
//     }
//     return newState
// }
import studyReducer from './reducers/study'
import count from './reducers/count'
import music from './reducers/music'
import user from './user'
import article from './article'




//引入中间件
import thunk from 'redux-thunk'

const rootReducer=combineReducers({
    studyReducer,
    count,
    music,
    user,
    article
})

//applyMiddleware(thunk)中间件
const store=createStore(rootReducer,applyMiddleware(thunk))

export default store