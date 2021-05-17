/* eslint-disable import/no-anonymous-default-export */
//代码分割,可以进行路由懒加载
import loadble from '@loadable/component'
import React from 'react'
//导入icon
//引入jsx元素一定要导入React
import {
    FileMarkdownOutlined,
    HourglassOutlined,
    BarChartOutlined
  } from '@ant-design/icons';


const Home=loadble(()=>import('./home'))
// const Hooks=loadble(()=>import('./study/Hooks'))
// const Todolist=loadble(()=>import('./study/Todolist'))
const Cnode=loadble(()=>import('./study/Cnode'))
const HocComponent=loadble(()=>import('./study/HocComponent'))
const Types=loadble(()=>import('./study/Types'))
const Broup=loadble(()=>import('./study/Broup'))
const FormComponent=loadble(()=>import('./study/FormComponent'))

const RouterHook=loadble(()=>import('./router/RouterHook'))
const UserDetail=loadble(()=>import('./router/UserDetail'))
const Echart=loadble(()=>import('./canvas/Echart'))
const Globe=loadble(()=>import('./canvas/Globe'))

// const mobxComponent=loadble(()=>import('./mobx/mobxComponent'))
// const TodoList2=loadble(()=>import('./mobx/TodoList2'))
const Redux=loadble(()=>import('@/pages/Redux'))
const Hookredux=loadble(()=>import('@/pages/Hookredux'))
const Error=loadble(()=>import('@/views/error'))
const ActicleList=loadble(()=>import('@/views/acticle/FromList'))
const ActicleInfo=loadble(()=>import('@/views/acticle/RichInfo'))
const Leave=loadble(()=>import('@/views/check/Leave'))
const AddLeave=loadble(()=>import('@/views/check/AddLeave'))
const Order=loadble(()=>import('@/views/order/Order'))
const UserList=loadble(()=>import('@/views/user'))












// 无权限的路由
export const constRoutes = [
    {
		id: 8146,
		text: '首页大屏',
		path: '/',
		component: Echart
	},
	{
		id: 10086,
		text: '404',
		hide: true,
		path: '/404',
		component: Error
	}
]





export default[
    {
        id:1,
        text:'项目作业',
        icon:<FileMarkdownOutlined />,
        authority:['yeshao'],
        children:[
            // {id:101,text:'音乐播放列表',path:'/hooks',component:Hooks},
            // {id:102,text:'Todolist',path:'/todolist',component:Todolist},
            {id:103,text:'Cnode',path:'/cnode', authority:['yeshao'],component:Cnode},
        ]
    },
    {
        id:2,
        text:'基础组件练习',
        icon:<HourglassOutlined />,
        authority:['yeshao'],
        children:[
            {id:201,text:'高阶组件', authority:['yeshao'],path:'/hoc',component:HocComponent},
            {id:202,text:'数据类型检查',authority:['yeshao'],path:'/types',component:Types},
            {id:203,text:'组合',authority:['yeshao'],path:'/broup',component:Broup},
            {id:204,text:'表单',authority:['yeshao'],path:'/form',component:FormComponent}, 
        ]
    },
    {
        id:3,
        text:'路由',
        icon:<HourglassOutlined />,
        authority:['admin'],
        children:[{
            id:301,
            text:'路由跳转',
            path:'/router/hooks',
            component:RouterHook,
            authority:['admin'],
            children:[
             {id:3001,text:'用户详情',authority:['admin'], path:'/detail/:id',component:UserDetail}//动态路由，路由传参}
            ]
        }]          
    },
    {
        id:4,
        text:'图表',
        icon:<BarChartOutlined />,
        authority:['yeshao'],
        children:[
            {id:401,text:'Echart图表',authority:['yeshao'],path:'/echart',component:Echart},
            {id:402,text:'3D地球',authority:['yeshao'],path:'/globe',component:Globe},
        ]
    },
    {
        id:5,
        text:'状态管理',
        icon:<BarChartOutlined />,
        authority:['admin'],
        children:[
            // {id:501,text:'mobxComponent',path:'/mobx',component:mobxComponent},
            // {id:502,text:'todolist2',path:'/todo',component:TodoList2},
        ]
    },
    {
        id:6,
        text:'Redux',
        icon:<BarChartOutlined />,
        authority:['admin'],
        children:[
            {id:601,text:'redux',authority:['admin'],path:'/redux',component:Redux},
            {id:602,text:'Hookredux',authority:['admin'],path:'/hookredux',component:Hookredux},
        ]
    },
     {
        id:7,
        text:'文章列表',
        icon:<BarChartOutlined />,
        authority:['yeshao'],
        children:[
            {id:701,text:'文章列表',authority:['yeshao'],path:'/acticle/list',component:ActicleList},
            {id:702,text:'文章详情', hide: true, authority:['yeshao'],path:'/acticle/info',component:ActicleInfo,
            children:[
            {id:7001,text:'三级页面',authority:['yeshao'],path:'/acticle/list/d',component:UserDetail},
            ]

        },
        ]
    },
    {
        id:8,
        text:'考勤管理',
        icon:<BarChartOutlined />,
        authority:['yeshao'],
        children:[
            {id:801,text:'请假加班', authority:['yeshao'],path:'/check/leave',component:Leave,
            
        },
        {id:8001,text:'添加请假加班', authority:['yeshao'],path:'/check/addleave',component:AddLeave}
            
        ]
    },
    {
        id:9,
        text:'订单管理',
        icon:<BarChartOutlined />,
        authority:['yeshao'],
        children:[
            {id:901,text:'订单详情', authority:['yeshao'],path:'/order',component:Order}
        ]
    },
     {
        id:10,
        text:'用户管理',
        icon:<BarChartOutlined />,
        authority:['yeshao'],
        children:[
            {id:1001,text:'用户列表', authority:['yeshao'],path:'/user',component:UserList}
        ]
    }
 

]

