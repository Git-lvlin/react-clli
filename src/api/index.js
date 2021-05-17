import axios from '@/utils/axios'

//get /topics 主题首页
//入参：
// page Number 页数
// tab String 主题分类。目前有 ask share job good
// limit Number 每一页的主题数量
// mdrender String 当为 false 时，不渲染。默认为 true，渲染出现的所有 markdown 格式文本。
const Topics=params=>axios({
    url:'https://cnodejs.org/api/v1/topics',
    method:'GET',
    params
})
const Music=params=>axios({
    url:'/soso/fcgi-bin/client_search_cp',
    method:'GET',
    params
})

//登录
const Login=data=>axios({
    url:'/user/login',
    method:'POST',
    data
})

//获取用户权限管理信息
const UserInfo=params=>axios({
    url:'/role/userinfo',
    method:'GET',
    params
})

//获取用户管理列表
const UserList=params=>axios({
    url:'/role/userList',
    method:'GET',
    params
})

//新增用户
const AddUser=data=>axios({
    url:'/role/userAdd',
    method:'POST',
    data
})

//获取文章列表
const ArticleList=params=>axios({
    url:'/article/list',
    method:'GET',
    params
})

//获取文章品类
const ArticleCate=params=>axios({
    url:'/good/cates',
    method:'GET',
    params
})

//删除对应行的文章
const ArticleDel=data=>axios({
    url:'/article/del',
    method:'POST',
    data
})

//文章新增与编辑
const ArticleAdd=data=>axios({
    url:'/article/add',
    method:'POST',
    data
})




//获取请假列表
const LeaveList=params=>axios({
    url:'/good/leave',
    method:'GET',
    params
})

// 申请新增与编辑申请人
const AddLeaveList=data=>axios({
    url:'/good/addleave',
    method:'POST',
    data
})



export default{
    Topics,
    Music,
    Login,
    UserInfo,
    ArticleList,
    ArticleCate,
    LeaveList,
    AddLeaveList,
    ArticleDel,
    ArticleAdd,
    UserList,
    AddUser
}