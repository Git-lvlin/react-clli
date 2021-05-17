/* eslint-disable import/no-anonymous-default-export */
import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

//导入自定义品类
import ActileSelect from './ActileSelect'

import {  Form,
    Button,
    Upload,
    Input,
    Switch
} from 'antd'
import { UploadOutlined } from '@ant-design/icons';
import { getArticleList,postArticleAdd } from '@/store2/actions'



export default props=>{
    //声明变量
    const [content,setContent]=useState({})
    const d=useDispatch()
    const [id,setId]=useState(null)
    // 表单上各种api操作
	const [form] = Form.useForm()

    // const obj=useSelector(store=>store.user.authoritys.obj)
    // console.log(obj)
    //获取路径上的id，用来判断是新曾还是编辑
    // useEffect(()=>{
    //     console.log(props)
    //     let search=props.location.search
    //     //当search存在证明是编辑，对id进行处理
    //     if(search){
    //         const id=search.replace('?id=','')
    //         //是编辑就调用文章列表来进行渲染
    //         d(getArticleList())
    //         setId(id)
    //     }
    //     return undefined
    // },[])

    // useEffect(()=>{
    //     if(id){
    //         form.setFieldsValue(obj.list)
    //         setContent(obj)
    //     }
    //     return undefined
    // },[])

    //表单布局距离
    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      };
    
    //图片上传
    const normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
    };
    
    //提交
    const onFinish = (values) => {
        let ble=(Object.prototype.toString.call(content) ==="[Object Object]")
        values.content=ble ? '' : content//将富文本框输入的内容添加到提交表单的对象上
        console.log('提交的内容: ', values);
        values.img = values.img[0].response.data.img
        d(postArticleAdd(values))
        props.history.push('/dash/acticle/list')
    }
    //品类下拉框方法
    // const searchCate=()=>{
        
    // }
    //富文本方法
    // const handleChange=()=>{

    // }
    return (
        <div className="ye-richinfo">
            <Form
                form={form}
                name="submit"
                {...formItemLayout}
                onFinish={onFinish}
                initialValues={{
                    'input-number': 3,
                    'checkbox-group': ['A', 'B'],
                    rate: 3.5,
                }}
                >
                {/* 标题 */}
                <Form.Item label="标题" name="title" hasFeedback rules={[{ required: true, message: '请输入标题!' }]}>
                   <Input />
                </Form.Item>
                {/* 品类下拉框 */}
                <Form.Item
                    name="cate"
                    label="品类"
                    hasFeedback
                    rules={[{ required: true, message: '请选择品类!' }]}
                >
                    <ActileSelect/>
                </Form.Item>
                {/* 图片上传 */}
                <Form.Item
                    name='img'
                    label="Upload"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    extra
                >
                    <Upload name="xxx" action="http://localhost:3000/api/v1/upload/img" listType="picture">
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                </Form.Item>
                {/* 状态 */}
                <Form.Item name="status" label="状态">
                    <Switch></Switch>
                </Form.Item>
                {/* 富文本框 */}
                <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                    <ReactQuill
                     value={content}
                     onChange={e=>setContent(e)}
                    />
                </Form.Item>
                {/* 提交 */}
                <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                    <Button type="primary" htmlType="submit">
                      {id?'修改':'新增'}
                    </Button>
                </Form.Item>
                </Form>
        </div>
    )
}