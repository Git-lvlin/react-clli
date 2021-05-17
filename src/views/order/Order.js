/* eslint-disable import/no-anonymous-default-export */
//订单管理
import React,{useState,useEffect} from 'react'
import io from 'socket.io-client'

export default props=>{
    let [orders,setOrders]=useState([
        // {id:1,order_no:'343242332432'},
        // {id:2,order_no:'5464564564554'},
        // {id:3,order_no:'879879798'}
    ])
    //获取订单
    useEffect(()=>{
        var socket=io('http://localhost:3000',{})
        socket.on('server',oredr=>{
            console.log(oredr)
            setOrders([oredr])
        })
        return undefined
    })
    return(
        <div>
            {
                orders.map(ele=>(
                    <div key={ele._id}>
                    <div>订单编号：{ele.order_no}</div>
                    <div>用户id：{ele.user_id}</div>
                    </div>
                ))
            }
        </div>
    )
}