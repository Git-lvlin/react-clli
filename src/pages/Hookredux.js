/* eslint-disable import/no-anonymous-default-export */
import React, {useEffect,useState} from 'react'
//导入action的方法
import { msgChange,countAddOrSub,getMusicList } from '../store2/actions'
//使用react-redux中的Hooks API可以更方便，替代掉connect高阶组件的写法
import { useDispatch,useSelector } from 'react-redux'


//QQ音乐接口请求参数
const str='ct=24&qqmusic_ver=1298&new_json=1&remoteplace=txt.yqq.song&searchid=67650979125851766&t=0&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&p=1&n=10&w=%E5%91%A8%E6%9D%B0%E4%BC%A6&g_tk_new_20200303=5381&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0'

// 对参数进行分割
const arr=str.split('&')
const params={}
arr.map(ele=>{
    var arr2=ele.split('=')
    params[arr2[0]]=arr2[1]
})
// console.log(params)


//hook语法
//使用react-redux中的hooks API更方便
export default props=>{
    const msg=useSelector(store=>store.studyReducer.msg)
    const count=useSelector(store=>store.count.count)
    const music=useSelector(store=>store.music)
    
    console.log(music)
    const [page,setPage]=useState(1)//改变页数
    const [want,setWant]=useState('周杰伦')//搜索关键字
    const [load,setLoad]=useState(0)//回车中间值
    params.w=want//按歌星名字搜索
    params.p=page //分页
    //分页临界值
    if(page<1){
        setPage(1)
    }

   

    const d=useDispatch()
        // console.log('props',props)
        const click=()=>{
            d(msgChange('新的值'))
        }
        const clickCount=(payload)=>{
            d(countAddOrSub(payload))
        }

        //利用副作用来调用，不然会一直执行
        useEffect(()=>{
            d(getMusicList(params))//第一次dispatch触发action方法
            return undefined
        },[page,load])//当页数变化和回车就调用接口
        
        const onkeycode=e=>{
            if(e.keyCode==13){
                setLoad(load+1)
            }
        }
        return(
            <div>
                <h1>redux</h1>
                <h2>{msg}</h2>
                <button onClick={click}>修改redux中的牛逼</button>
                <hr/>
                <h2>{count}</h2>
                <button onClick={()=>clickCount(-5)}>自减</button>
                <button onClick={()=>clickCount(5)}>自增</button><br/>
                <hr/>
                <h2>音乐歌单</h2>
                <input type="text" value={want} onChange={e=>setWant(e.target.value)} onKeyUp={(e)=>onkeycode(e)}/>
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
    }