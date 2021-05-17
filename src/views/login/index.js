import React, { useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import { Form, Input, Button, Checkbox } from 'antd';
import './style.scss'

//导入action的方法
import { loginAction } from '@/store2/actions'
import { useDispatch,useSelector } from 'react-redux'

//布局
const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 5, span: 16 },
  };

export default function Login(){
    let history=useHistory()
    const d=useDispatch()
    const token=useSelector(store=>store.user.authoritys.token)
    const onFinish = (values) => {
        console.log('Success:', values);
        // localStorage.setItem('token','login')
        
        d(loginAction(values))  
        //  api.Login(values).then(res=>{
        //    console.log(res)
        //  })
      }
    useEffect(()=>{
      if(token){
        //有token就跳到内页
        history.replace('/dash')
      }
      return undefined
    })
    return (
        <div className="ye-login">
          <div className="main">
          <Form
            {...layout}
            name="basic"
            initialValues={{ 
              username: 'admin',
              password: '123456',
              remember: true 
            }}
            onFinish={onFinish}
            >
            <Form.Item
                label="账号"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="密码"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                <Checkbox>记住密码</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                登录
                </Button>
            </Form.Item>
            </Form>
          </div>
        </div>
    )
}