import {
	HashRouter,
	Redirect,
	Route
} from 'react-router-dom'

import { useState,useEffect } from 'react'

//系统内页
import { Lsyout } from './components'
//登录页
import Login from './views/login'

//mobx集成
// import store from '@/store'

//redux集成
import store from '@/store2/index.js'






//创建状态管理上下文
// import { Provider } from 'mobx-react'
import { Provider } from 'react-redux'

//国际化
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import enGB from 'antd/lib/locale/en_GB';
// import { L } from '@/lang'

const langs={zhCN,enGB}



function App() {
	// console.log(localStorage.getItem('token'))
  const [lang,setLang]=useState(enGB)
  const langChange=e=>{
	setLang(langs[e])
  }
  return (
    <div className="App">
	<HashRouter>
		{/*mobx中 store属性随便定义 */}
		{/* redux中只能用store */}
		{/* <Provider store={store}> */}
		{/* 相当于<Provider todo={todo} music={music}> */}
		{/* 利用上下文注入状态管理的数据 */}
		<Provider store={store}>
			{/* 注入国际化 */}
			<ConfigProvider locale={lang}>
				{/* 登录页 */}
				<Route path='/login'  render={()=>{
					const token=localStorage.getItem('token')
					return token?<Redirect to='/dash'/>:<Login/>
				}}/>
				{/* 系统内页 */}
				<Route path='/dash'  render={()=>{
					const token=localStorage.getItem('token')
					return token?<Lsyout onLang={e=>langChange(e)} />:<Redirect to='/login'/>
				}}/>
				{/* 默认打开的页面 */}
				<Redirect to='/dash'/>
			</ConfigProvider>
		</Provider>
	</HashRouter>
    </div>
  );
}

export default App;