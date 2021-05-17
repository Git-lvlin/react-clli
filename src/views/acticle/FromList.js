/* eslint-disable import/no-anonymous-default-export */
import React,{useState,useEffect} from 'react'
import { Input,Row, Col,Table,Popover,Button } from 'antd';

//导入封装的下拉品类组件
import   ActileSelect   from './ActileSelect.js'
import '@/assets/less/style.less'
import {//icon
	ColumnHeightOutlined,
} from '@ant-design/icons'

import {useSelector,useDispatch} from 'react-redux'
import { getArticleList,postArticleDel } from '@/store2/actions'
import moment from 'moment' //导入时间处理




export default props=>{
    const [stateArr,setStateArr]=useState({
      text:'',
      cate:'',
      page:1,
      size:2
    })
    //让表单受控
    const [search,setSearch]=useState('')
    //改变表格尺寸大小
    const [tableSize, setTableSize] = useState('default')
    const d=useDispatch()
    //渲染列表的对象
    const obj=useSelector(store=>store.user.authoritys.obj)
    //所有品类
    const cates=useSelector(store=>store.article.cates)

//表格头部数组
const columns = [
  {
    title: '图片',
    dataIndex: 'img',
    align:'center',
    render:img=>{
      return(
        <div className='ye-img'>
          <img src={'http://localhost:4444'+img}/>
        </div>
      )
    }
  },
  {
    title: '标题',
    dataIndex: 'title',
    align:'center',
  },
  {
    title: '品类',
    dataIndex: 'cate',
    align:'center',
    render:cate=>{
      const ele=cates.find(ele=>ele.cate===cate)
      return (
        <div>{ele&&ele.cate_zh}</div>
      )
    }
  },
  {
    title:'发布时间',
    dataIndex:'create_time',
    align:'center',
    render:t=>(moment(t).format('M月DD日'))
  },
  {
    title:'操作',
    dataIndex:'_id',
    align:'center',
    render:id=>{
      const content = (
        <div>
          <Button>取消</Button>
          <Button onClick={()=>handel(id)}>确定</Button>
        </div>
      );
      return (
        <div>
           <a onClick={()=>props.history.push('/dash/acticle/info?id='+id)}>编辑</a>
           <Popover content={content} title="你确定要删除吗?">
           <a>删除</a>
           </Popover>
        </div>
      )
    }
  }
]
//删除操作
const handel=(id)=>{
  d(postArticleDel({id,stateArr}))
}

//复选框
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === 'Disabled User',
    // Column configuration not to be checked
    name: record.name,
  })
}

    //当查询条件变化时，更新filter，进一步触副作用调接口
    const stateChange=(val,key)=>{
      const newStateArr={...stateArr}
      if(key==='pagination'){
        newStateArr['page']=val.page
        newStateArr['size']=val.size
      }else{
        newStateArr[key]=val
      }
      setStateArr(newStateArr)
    }
   
    //控制列表尺寸
    const changeSize = e => {
      console.log(e)
			setTableSize(e.target.dataset.size)
		}

    //触发获取文章列表的接口方法
    useEffect(()=>{
      d(getArticleList(stateArr))
      return undefined
    },[stateArr])//stateArr里面的数据一改变就触发actions

    //让表单可以受控
    const EnterSearch=val=>{
      //  console.log('e',val)
       setSearch(val)
    }
    //新增
    const addActricle=()=>{
      //跳转到新增页面
      props.history.push('/dash/acticle/info')
    }
    return(
        <div className="ye-header">
         <Row>
            <Col span={2}>
              {/* 文章标题 */}
              <div className="title">
                文章列表
              </div>
            </Col>

            {/* 筛选面板 */}
            {/* 文章查询 */}
            <Col span={4}>
              <Input
                  allowClear
                  placeholder="请输入"
                  value={search}
                  onChange={e=>EnterSearch(e.target.value)}
                  size="large"
                  onPressEnter={e=>stateChange(e.target.value,'text')}
              />
            </Col>
            <Col span={2}>
              <div className="title2">
                描述:
              </div>
            </Col>
            {/* 自定义封装的品类 */}
            <Col span={4}>
                <ActileSelect
                  value={stateArr.cate}
                  onChange={val=>stateChange(val,'cate')}
                  allowClear
                  showAll
                />
            </Col>
            {/* 筛选面板-end */}

            {/* 新增 */}
            <Col offset={2} span={6}>
            <Button
             type="primary"
             onClick={()=>addActricle()}
             >
              新增
            </Button>
            </Col>
            {/* 控制尺寸 */}
            <Col span={4}>
               <Popover
									placement="bottomLeft"
									content={
										<div className='ye-size' onClick={e=>changeSize(e)}>
											<p data-size='default'>默认</p>
											<p data-size='middle'>中等</p>
											<p data-size='small'>紧凑</p>
										</div>
									}
									trigger="click"
								>
									<ColumnHeightOutlined />
								</Popover>
            </Col>
        </Row>
           {/* 表格 */}
          <>
          <Table
            rowSelection={{
              type: 'checkbox',
              ...rowSelection
            }}
            //尺寸
            size={tableSize}
            //用于渲染的地方
            columns={columns}
            //获取文章列表进行渲染
            dataSource={obj.list}
            //分页
            pagination={{
              total:obj.total,
              pageSizeOptions: [2,3,5,10],
              showTotal:(total,range)=>(
                `第${range[0]}-${range[1]}条/总共${total}条`
              ),
              defaultPageSize: stateArr.size,
              defaultCurrent: stateArr.page,
              onChange: (page,size)=>stateChange({page,size},'pagination')
            }}
          />
      </>  
        </div>
    )
}