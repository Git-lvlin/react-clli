import React from 'react'
import {useParams} from 'react-router-dom'

export default props=>{
    console.log(props)
    const p=useParams()
    return(
        <div>
           <h1>用户详情</h1>
           <h3>你访问的是{p.id}</h3>
        </div>
    )
}