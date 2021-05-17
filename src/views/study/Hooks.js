"use strict"

import React,{useState,useEffect} from 'react'
// import axios from '@/utils/axios.js'
// 函数式组件（无状态组件、纯组件、PureComponent)

import { inject,observer } from 'mobx-react'


//QQ音乐接口请求参数
const str='ct=24&qqmusic_ver=1298&new_json=1&remoteplace=txt.yqq.song&searchid=67650979125851766&t=0&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&p=1&n=10&w=%E5%91%A8%E6%9D%B0%E4%BC%A6&g_tk_new_20200303=5381&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0'

//对参数进行分割
const arr=str.split('&')
const params={}
arr.map(ele=>{
    var arr2=ele.split('=')
    params[arr2[0]]=arr2[1]
})
console.log(params)

export default inject('music')(observer(props=>{
    //定义时要用const，因为不能修改useState
    //useState()一定要赋初始值
    // const [ count,setCount]=useState(0)
    // const [ msg,setMsg]=useState('')
    // const [ show,setShow]=useState(true)
    // const [ num,setNum]=useState(10)

    // const [musicArr,setMusic]=useState([])//歌曲列表
    const [swan,setSwan]=useState('周杰伦')//搜索关键词
    const [rate,setRate]=useState(0)//利用中间变量控制回车才进行搜索
    const [page,setPage]=useState(1)//分页
    console.log('props',props)

    let { music }=props

    // let timer=null
    //useEffect
    // useEffect(()=>{
    //     timer=setInterval(()=>{//相当于Mount
    //         setNum(num+10)
    //     },1000)
    //     return ()=>{//相当于WillUnmount
    //         clearInterval(timer)
    //     }
    // },[num])//[num],只要num变化就执行一次,相对于Update
    //         //添加[]只执行一次

    // useEffect(()=>{
    //     document.title='牛逼'
    //     console.log('----title')
    //     return undefined
    // },[])//添加[]只执行一次
    

    //音乐播放列表
    useEffect(()=>{
        params.w=swan//按歌星名字搜索
        params.p=page //分页
        if(page<=1){
           setPage(1)
        }
        // axios({
        //     method:'GET',
        //     params:params,
        //     url:'/soso/fcgi-bin/client_search_cp'
        // }).then(res=>{
        //     console.log('音乐列表',res.song.list)
        //     setMusic(res.song.list)
        // })
        //触发调接口的方法，触发mobx的actions
        music.updateList(params)
        return undefined
    },[rate,page])//rate,page只要回车rate发生变化就进行搜索,page进行分页

    const search=e=>{//回车抬起搜索方法
        if(e.keyCode==13){
            setRate(rate+1)//利用中间变量控制回车才进行搜索
        }
    }
    return(
        <div>
            {/* <div>无状态组件</div>
            <hr/>
            <h2>{count}</h2>
            <button onClick={()=>setCount(count-1)}>自减</button>
            <button onClick={()=>setCount(count+1)}>自增</button>
            <hr/>
            <input type="text" value={msg} onChange={e=>setMsg(e.target.value)}/>
            <hr/>
            {show && <h3>显示隐藏的内容</h3>}
            <button onClick={()=>setShow(show?false:true)}>显示/隐藏</button>
            <hr/>
            <h2>{num}</h2>
            <hr/> */}

            <h1>歌单搜索</h1>
            <input 
              type="text"
              value={swan}
              onChange={e=>setSwan(e.target.value)}
              onKeyUp={e=>search(e)}//键盘抬起进行搜索
            />
            {
                music.list.map(ele=>(
                    <div key={ele.id}>
                        <p>{ele.title}</p>
                    </div>
                ))
            }
            <button onClick={()=>setPage(page-1)}>上一页</button>
            <button onClick={()=>setPage(page+1)}>下一页</button>
        </div>
    )
}))

