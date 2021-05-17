/* eslint-disable import/no-anonymous-default-export */
import React,{useState,useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { postLeaveList } from '@/store2/actions'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import moment from 'moment';

import {  Form,
    Input,
    Button,
    Select,
    DatePicker,
} from 'antd'

const { Option } = Select;
const { RangePicker } = DatePicker;

export default props=>{
    //声明变量
    const [stateArr,setStateArr]=useState({
        gap:0
    })
    // const [remark,setRemark]=useState({})
    const [id, setId] = useState(null)
    const [flag, setFlag] = useState(0)
    const user=useSelector(store=>store.user.authoritys)

    const dispatch = useDispatch()
	const done = useSelector(store=>store.article.done)
    const info = useSelector(store=>store.article.info)
    console.log('info', info)

    //表单布局距离
    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      };
    
    // 提交
	const submit = data => {
        console.log(data)
        data.dura=stateArr.gap
		// data.remark = remark
		if(id) data.id = id
		dispatch(postLeaveList(data))
	}

    useEffect(()=>{
		setFlag(flag+1)
		return undefined
	}, [done])

    useEffect(()=>{
		if(flag>1) {
			props.history.goBack()
		}
		return undefined
	}, [flag])

    //时间方法
    function range(start, end) {
        const result = [];
        for (let i = start; i < end; i++) {
          result.push(i);
        }
        return result;
    }
    function disabledDate(current) {
        // Can not select days before today and today
        return current && current < moment().endOf('day');
    }
    function disabledRangeTime(_, type) {
        if (type === 'start') {
          return {
            disabledHours: () => range(0, 60).splice(4, 20),
            disabledMinutes: () => range(30, 60),
            disabledSeconds: () => [55, 56],
          };
        }
        return {
          disabledHours: () => range(0, 60).splice(20, 4),
          disabledMinutes: () => range(0, 31),
          disabledSeconds: () => [55, 56],
        };
      }
    
    const onPone=(val)=>{
        console.log(val)
        let c=(val[1]._d-val[0]._d)/1000/60/60
        // return c
        // console.log(c)
        setStateArr({gap:c})
    }

    return (
        <div className="ye-richinfo">
            <Form
                name="validate_other"
                {...formItemLayout}
                onFinish={submit}
                initialValues={{
                    'input-number': 3,
                    'checkbox-group': ['A', 'B'],
                    rate: 3.5,
                }}
                >
                {/* 姓名 */}
                <Form.Item label="姓名" name="name">
                   <Input value={user.yeshao} defaultValue={user.yeshao} bordered={false}/>
                </Form.Item>
                
                 {/* 部门 */}
                 <Form.Item label="部门" name="dpm">
                    <Select defaultValue="HTML学科" style={{ width: 120 }} allowClear>
                        <Option value="HTML学科">HTML学科</Option>
                        <Option value="研究部">研究部</Option>
                        <Option value="开发部">开发部</Option>
                    </Select>
                </Form.Item>

                 {/* 审批人*/}
                 <Form.Item label="审批人" name="aprove">
                   <Input/>
                </Form.Item>
                {/* <span>请选择总监或总监以上的审批人</span> */}
                <Form.Item label="请假事由" name="leave_type">
                    <Select defaultValue="生病" style={{ width: 120 }} allowClear>
                        <Option value="生病">生病</Option>
                        <Option value="有事">有事</Option>
                        <Option value="去玩">去玩</Option>
                    </Select>
                </Form.Item>

                {/* 时间段 */}
                <Form.Item label="时间" name="leave_time">
                        <RangePicker
                        disabledDate={disabledDate}
                        disabledTime={disabledRangeTime}
                        onChange={(val)=>onPone(val)}
                        showTime={{
                            hideDisabledOptions: true,
                            defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
                        }}
                        format="YYYY-MM-DD HH:mm:ss"
                        />
                </Form.Item>

                 {/* 时间差 */}
                 <Form.Item label="共">
                   <Input  className="ye-input" value={parseInt(stateArr.gap)+'小时'} onChange={()=>onPone()}/>
                </Form.Item>
                {/* 文本框 */}
                <Form.Item name='remark' label="备注">
                    <Input.TextArea />
                </Form.Item>
                {/* 提交 */}
                <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                    <Button type="primary" htmlType="submit">
                       提交
                    </Button>
                </Form.Item>
                </Form>
        </div>
    )
}



