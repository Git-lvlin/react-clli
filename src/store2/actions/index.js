import types from '../actionTypes'

import  api  from '@/api'

//action生成器
function countAddOrSub(payload){
    return {
        type:types.COUNT_CHAN,
        payload
    }
}

function msgChange(payload){
    return{
        type:types.STUDY_UPDATE,
        payload
    }
}
//在Redux中，dispatch是同步的，它负责向Store派发一个对象
function getMusicList(params){
    //触发调接口
    // 在Redux中，dispatch是同步的，它负责向Store中派发一个对象
    // 用于支持异步action的生成器方法，必须 return一个function
    return dispatch=>(
        api.Music(params).then(res=>{
            // console.log(res)
            dispatch({//第二次dispatch
                type:types.GET_QQ_MUSIC,
                payload:res.song.list
            })
        })
    )
}

//用户登录
function loginAction(data){
    return dispatch=>(
        api.Login(data).then(res=>{
           dispatch({
                type:types.SUBMNI_LGOIN,
                payload:res.token
            })
            localStorage.setItem('token', res.token)
            //登录后获取用户信息进行权限管理
            dispatch(userinfoAction())
        })
    )
}

//获取用户权限信息
function userinfoAction(){
    return dispatch=>(
        api.UserInfo().then(res=>{
            dispatch({
                type:types.USER_INFO,
                payload:res.info[1].role
            })
        })
    )
}

//获取用户管理列表
function getUserList(){
    return dispatch=>(
        api.UserList().then(res=>{
            console.log('userlist',res)
            dispatch({
                type:types.USER_LIST,
                payload:res.list
            })
        })
    )
}

//新增用户
function addUserRole(data){
    return dispatch=>(
        api.AddUser(data).then(res=>{
            console.log('新增成功',res)
            dispatch(getUserList())
        })
    )
        
}

//获取文章品类
function getArticleCate(){
    return dispatch=>(
        api.ArticleCate().then(res=>{
            console.log(res)
            dispatch({
                type:types.ARTICLE_CATE,
                payload:res
            })
        })
    )
}

//获取文章列表
function getArticleList(){
    return dispatch=>(
        api.ArticleList().then(res=>{
            console.log(res)
            dispatch({
                type:types.ARTICLE_LIST,
                payload:res
            })
        })
    )
}

//删除对应行的文章
function postArticleDel({id,stateArr}){
    return dispatch=>(
        api.ArticleDel({id:id}).then(res=>{
            console.log(res)
            //删除之后触发调列表接口的方法
            dispatch(getLeaveList(stateArr))
        })
    )
}

//文章新增
function postArticleAdd(data){
    return dispatch=>(
        api.ArticleAdd(data).then(()=>{
            dispatch({
                type:types.ARTICLE_ADD,
                payload:''
            })
        })
    )
}

//获取请假列表
function getLeaveList(){
    return dispatch=>(
        api.LeaveList().then(res=>{
            console.log(res)
            dispatch({
                type:types.LEAVE_LIST,
                payload:res
            })
        })
    )
}

// 申请新增与编辑
function postLeaveList(data){
	return dispatch=>(
		api.AddLeaveList(data).then((res)=>{
			console.log('res',res)
			dispatch({
				type: types.WRITE_LEAVE_LIST,
				payload: ''
			})
		})
    )
}

export {
    countAddOrSub,
    getMusicList,
    msgChange,
    loginAction,
    userinfoAction,
    getArticleList,
    getArticleCate,
    getLeaveList,
    postLeaveList,
    postArticleDel,
    postArticleAdd,
    getUserList,
    addUserRole
}