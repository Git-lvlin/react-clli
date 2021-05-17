/* eslint-disable import/no-anonymous-default-export */
import './style.scss'
import React,{useState,useEffect} from 'react'
import routes,{ constRoutes } from '@/views'
import { Route,Switch,Redirect,NavLink} from 'react-router-dom'
import Logout from '../logout'
import { useSelector,useDispatch } from 'react-redux'

import { Layout,Menu, Dropdown,Breadcrumb} from 'antd';
import { userinfoAction } from '@/store2/actions'
import { GithubOutlined,MenuUnfoldOutlined,MenuFoldOutlined } from '@ant-design/icons';
const { Header, Footer, Sider, Content } = Layout;



const { SubMenu } = Menu;



//所有路由规则组件
export default props=>{ 
    //接收国际化的事件
    console.log('props',props)
    //获取用于权限管理的信息
    const user=useSelector(store=>store.user.authoritys)
    const [bread,setBread]=useState({})
    const [boxad,setBoxad]=useState('')
    const [flag,setFlag]=useState(false)
    const dispatch=useDispatch()
      //触发调用用户权限管理方法
    useEffect(()=>{
        dispatch(userinfoAction())
        return undefined
    }, [])
    const NoMatch = ()=>{
		return <Redirect to='/dash/404' />
	}

    //展开收缩
    const ontogg=()=>{
        if(flag){
            setFlag(false)
        }else{
            setFlag(true)
        }
    }
  
    //对所有拥有路由规则的组件进行遍历（路由规则）
    //利用递归对所有嵌套组件进行遍历
    const renderRoutes=()=>{
        const list=[]
        const recursion=arr=>{
            arr.map(ele=>{
                //Route不能被div包裹，会报错
                    list.push(
                        <Route 
                        key={ele.id} 
                        path={'/dash'+ele.path}
                        component={ele.authority.includes(user.power)?ele.component: NoMatch}/>
                    )
                   
                ele.children&& recursion(ele.children)
            })
        }
       routes.map(ele=>(
        ele.children && recursion(ele.children)
        ))
        return list
    }

    // 生成“没有权限”的路由规则
	const renderConstRoutes = ()=> {
		return constRoutes.map(ele=>(
			<Route
				path={'/dash'+ele.path}
				key={ele.id}
				component={ele.component}
				exact
			/>
		))
	}
    //路由导航链接
    const renderLink=()=>{
        const linkArr=[]
        routes.map(box=>{
            console.log(user.power)
            // console.log(ele.authority)
            if(box.authority.includes(user.power)){//只有yeshao的用户可以看到的组件
               linkArr.push(
                    <SubMenu key={box.id} title={box.text} icon={box.icon}>
                       {
                          (!box.hide &&box.children) && box.children.map(ele=>(
                                (ele.authority.includes(user.power))&&
                                <Menu.Item key={ele.id}>
                                    <NavLink key={ele.id} to={'/dash'+ele.path} onClick={()=>onRumb(box.text,ele)}>{ele.text}</NavLink>
                                </Menu.Item>
                            ))
                       }
                    </SubMenu>
                )
            }
        })
        return linkArr
    }

    const onRumb=(box,ele)=>{
        setBread(ele)
        setBoxad(box)
    }

    //头部header
    const renderHeader=()=>{
        const menu = (
            <Menu>
              <Menu.Item>
                <a target="_blank" rel="noopener noreferrer">
                  {/* 退出登录 */}
                  <Logout/>
                </a>
              </Menu.Item>
              <Menu.Item onClick={()=>props.onLang('enGB')}>
                  英文
              </Menu.Item>
              <Menu.Item onClick={()=>props.onLang('zhCN')}>
                  中文
              </Menu.Item>
            </Menu>
          );
        return(
            <div className='ye-header'>
                <Dropdown overlay={menu} placement="bottomLeft" arrow>
                   <GithubOutlined />
                </Dropdown>
                <span className="ye-user">
                  {user.power}
                </span>
            </div>
        )
    }

    // console.log(user.power);
    return (
         <div className="admin-layout">
                <>
                    <Layout>
                        {/* 左边菜单部分 */}
                        <Sider collapsible collapsed={flag}>
                        {/* 给icon展开收缩组件传递声明式变量和事件 */}
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{ height: '100%', borderRight: 0 }}
                                theme="dark"
                            >
                            {user.power && renderLink()}
                            </Menu>
                        </Sider>
                        {/* 右边内容部分 */}
                        <Layout>
                            {/* 头部 */}
                            <Header>
                                {/* 展开收缩 */}
                                <div className='togg' onClick={()=>ontogg()}>
                                {
                                    flag?<MenuUnfoldOutlined/>:<MenuFoldOutlined/>
                                }
                                </div>
                                {/* 面包屑 */}
                                <Breadcrumb>
                                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                                    <Breadcrumb.Item>{boxad}</Breadcrumb.Item>
                                    <Breadcrumb.Item>
                                    <NavLink to={'/dash'+bread.path}>{bread.text}</NavLink>
                                    </Breadcrumb.Item>
                                </Breadcrumb>
                                    {renderHeader()}
                            </Header>
                            {/* 中间部分 */}
                            <Content>
                                <Switch>
                                    {user.power && renderRoutes()}
                                    {renderConstRoutes()} 
                                    {/* 重定向
                                    <Redirect from="/dash/*" to="/dash"/> */}
                                </Switch>
                            </Content>
                            {/* 底部 */}
                            <Footer>Footer</Footer>
                        </Layout>
                    </Layout>
                </>
                </div>
    )
}