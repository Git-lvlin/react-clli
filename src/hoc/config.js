import React from 'react'
import dialog from '@/utils/dialog'


export default WrapComponent=>{
    return props=>(  
        <WrapComponent  {...props} dialog={dialog}/>
    )
}