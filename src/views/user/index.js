/* eslint-disable import/no-anonymous-default-export */
import React,{useEffect,useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { getUserList,addUserRole } from '@/store2/actions'
import { Button,Table, Space,Modal,Form, Input,Select } from 'antd';
const { Option } = Select;

export default ()=>{
    let d=useDispatch()
    let userList=useSelector(store=>store.user.authoritys.userlist)
    const columns = [
        {
          title: '用户名',
          dataIndex: 'username',
          key: 'username',
        },
        {
          title: '权限',
          dataIndex: 'role',
          key: 'role',
        },
        {
          title: '用户状态',
          dataIndex: 'status',
          key: 'status',
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <Space size="middle">
              <a onClick={()=>ondel(record)}>删除</a>
            </Space>
          ),
        },
      ];
    const [isModalVisible, setIsModalVisible] = useState(false);
    useEffect(()=>{
        d(getUserList())
        return undefined
    },[])
    //删除
    const ondel=(val)=>{
        console.log('val',val._id)
    }
    //新增按钮
    const onAddUser=()=>{
        setIsModalVisible(true);
    }
    //样式布局
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    //样式布局
    const tailLayout = {
        wrapperCol: {
          offset: 8,
          span: 16,
        },
    };
    const [form] = Form.useForm();
    const onGenderChange = (value) => {

    };
    //关闭弹窗
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    //提交表单
    const onFinish = (values) => {
        const params={
            username:values.note,
            role:values.role
        }
        //调接口
        d(addUserRole(params))
        setIsModalVisible(false);
        console.log(values);
    };
    return (
        <div className="user_list">
        {/* 用户管理列表 */}
          <Table
            columns={columns}
            dataSource={userList}
          />
        {/* 新增按钮 */}
        <Button type="primary" onClick={()=>onAddUser()}>
          新增
        </Button>
        {/* 新增弹窗 */}
        <Modal title="Basic Modal" visible={isModalVisible} onCancel={handleCancel} footer={null}>
            <Form {...layout} form={form} name="submit" onFinish={onFinish}>
                <Form.Item
                    name="note"
                    label="用户名"
                    rules={[{ required: true}]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="role"
                    label="用户权限"
                    rules={[{ required: true}]}
                >
                    <Select
                        placeholder="选择用户权限"
                        onChange={onGenderChange}
                        allowClear
                        >
                        <Option value="admin">超级管理员</Option>
                        <Option value="yeshao">商品管理</Option>
                    </Select>
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                    Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
        </div>
    )
}