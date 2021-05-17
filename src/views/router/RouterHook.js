import React,{useState} from 'react'
//路由跳转
import { useHistory } from "react-router-dom";

const Child=props=>{
    console.log(props)
    const history=useHistory()
    const skipToHome=()=>{
        history.push('/home')
    }
    return(
        <div>
           <div>子组件</div>
           <button onClick={skipToHome}>回到首页</button>
        </div>
    )
}

const Uselist=props=>{
    let { listArr }=props
    const history=useHistory()
    const Touserdetail=(ele)=>{
        history.push('/detail/'+ele.id)
    }
    return(
        <div>
           {
               listArr.map(ele=>(
                   <div key={ele.id} onClick={()=>Touserdetail(ele)}>
                   <span>{ele.id}</span>
                   <span>-----</span>
                   <span>{ele.text}</span>
                   </div>
               ))
           }
        </div>
    )
}

export default props=>{
    console.log(props)
    const [list]=useState([
        {id:1,text:'详情一'},
        {id:2,text:'详情二'}
        ])
    return(
        <div>
           <h1>路由hooks写法</h1>
           <Child/>
           <Uselist listArr={list}/>
        </div>
    )
}