/* eslint-disable import/no-anonymous-default-export */
import React,{useState,useEffect} from 'react'
import {Row, Col,Table,Button,Menu,Dropdown,Select,Popover, } from 'antd';



import '@/assets/less/style.less'


import {useSelector,useDispatch} from 'react-redux'
import { getLeaveList } from '@/store2/actions'
import moment from 'moment' //导入时间处理



const { Option } = Select;
export default props=>{
    const [stateArr,setStateArr]=useState({
      page:1,
      size:5
    })
    const [search,setSearch]=useState('')
    const d=useDispatch()
    const obj=useSelector(store=>store.article.obj)

    const VisibleChang=val=>{
        console.log(val)
    }

//表格头部数组
const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '部门',
    dataIndex: 'dpm',
  },
  {
    title: '请假类型',
    dataIndex: 'leave_type',
  },
  {
    title:'请假时间',
    dataIndex:'leave_time',
    align:'center',
    render:t=>(moment(t[0]).format('M月DD日HH时mm分ss秒')+'到'+moment(t[1]).format('M月DD日HH时mm分ss秒'))
  },
  {
    title: '时长',
    dataIndex: 'dura'
  },
  {
    title:'发布时间',
    dataIndex:'create_time',
    align:'center',
    render:t=>(moment(t).format('M月DD日HH时mm分ss秒'))
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
  {
    title: '审批人',
    dataIndex: 'aprove',
  },
  {
    title: '状态',
    dataIndex: 'status',
    render:t=>t?"已批准":"未批准"
  },
  {
    title:'操作',
    dataIndex:'_id',
    align:'center',
    render:id=>{
      return (
        <div>
            <Popover
                placement="bottomLeft"
                content={
                    <div onClick={e=>VisibleChang(e.target.innerHTML)}>
                        <p data-size='default'>张三</p>
                        <p data-size='middle'>李四</p>
                        <p data-size='small'>王五</p>
                    </div>
                }
                trigger="click"
            >
				追加审核人
			</Popover>
            
           {/* <a 
              className='edit'
			  onClick={()=>props.history.push('/check/addleave?id='+id)}>
               
          </a> */}
        </div>
      )
    }
  }
]

    //触发获取文章列表的接口方法
    useEffect(()=>{
      d(getLeaveList(stateArr))
      return undefined
    },[stateArr])

    //新增
    const addActricle=()=>{
      //跳转到新增页面
      props.history.push('/dash/check/addleave')
    }
    return(
        <div className="ye-header">
         <Row>
            {/* 新增 */}
            <Col offset={2} span={6}>
            <Button
             type="primary"
             onClick={()=>addActricle()}
             >
              添加申请
            </Button>
            </Col>
        </Row>
           {/* 表格 */}
          <>
          <Table
            columns={columns}
            //获取文章列表进行渲染
            dataSource={obj.list}

            //分页
            // pagination={{
            //   total:obj.total,
            //   pageSizeOptions: [2,3,5,10],
            //   showTotal:(total,range)=>(
            //     `第${range[0]}-${range[1]}条/总共${total}条`
            //   ),
            //   defaultPageSize: stateArr.size,
            //   defaultCurrent: stateArr.page,
            //   onChange: (page,size)=>stateChange({page,size},'pagination')
            // }}
          />
      </>  
        </div>
    )
}