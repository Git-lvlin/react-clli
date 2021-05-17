//封装下拉品类
import React,{useEffect} from 'react'
import { Select } from 'antd'
//类型检查
import PropTypes from 'prop-types'
//使用store中的品类数据
import {useSelector,useDispatch} from 'react-redux'
import { getArticleCate } from '@/store2/actions'

const { Option } = Select;

const ActileSelect=props=>{//父组件通过props把数据传递过来
    const {value,onChange,showAll}=props
    //从状态管理获取品类
    const cates=useSelector(store=>store.article.cates)
    const d=useDispatch()
    //深复制
    const newProps={...props}
    delete newProps.showAll
    const renderOptions=(cates)=>{
        return cates.map(ele=>(
            <Option key={ele.id} value={ele.cate}>{ele.cate_zh}</Option>
        ))
    }
    //触发品类接口方法
    useEffect(()=>{
        d(getArticleCate())
       return undefined
      },[])
    return (
        <div>
          <Select 
            {...newProps}
            style={{width:'100%'}}
            value={value}
            onChange={val=>onChange(val||'')}
            >
            {showAll&& <Option value=''>全部</Option>}
            {cates && renderOptions(cates)}
          </Select>
        </div>
    )
}

//类型检查
ActileSelect.propTypes={
    value:PropTypes.string,
    onChange:PropTypes.func,
    showAll:PropTypes.bool
}

export default ActileSelect