/* eslint-disable import/no-anonymous-default-export */
import React from 'react'
import PropTypes from 'prop-types'

const Child=props=>{
    console.log(props)
    return(
        <div>
            <h2>子组件</h2>
        </div>
    )
}

Child.propTypes={
    //检查msg数据类型
    msg:PropTypes.number
}

export default class extends React.Component{
    render(){
        return(
            <div>
              <h1>props数据类型检查</h1>
              <Child msg={1}/>
            </div>
        )
    }
}