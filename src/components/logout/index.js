/* eslint-disable import/no-anonymous-default-export */
import { Button } from 'antd';
import { useHistory} from 'react-router-dom'
import './style.scss'

export default ()=>{
    //退出登录
    let history=useHistory()
    const logout=()=>{
        localStorage.removeItem('token')
        history.push('/login')
    }
    return(
        <div className="ye-logout">
            <Button type="primary" onClick={logout}>
                退出登录
            </Button>
        </div>
    )
}