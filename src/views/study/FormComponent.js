import React from 'react'


export default class FormComponent extends React.Component{
    constructor(props){
        super(props)
        this.state={
            name:'',
            school:"北海校园"
        }
    }
    //提交接口
    submit(){
        const data={
            name:document.getElementById('name').value,
            // mobile:this.refs.mobile.value,
            school:this.state.school
        }
        console.log('提交接口',data)
    }
    render(){
        let { school }=this.state
        return(
            <div>
               <h1>表单绑定</h1>
               {/* 非受控表单 */}
               <input id="name" type="text"/>
               <span>姓名：</span>
               <input id="name" type="text"/><br/>
               {/* ref对dom进行操作 */}
               <span>手机：</span>
               {/* <input ref='mobile' type="text"/> */}
                <button onClick={()=>this.submit()}>提交</button>
               <hr/>


               {/* 受控表单 */}
               {/* 改不动 */}
               <h2>受控表单</h2>
               <span>学校：</span>
               <input 
                 type="text"
                 value={school} onChange={e=>this.setState({school:e.target.value})}/><br/>
               <button onClick={()=>this.submit()}>提交</button>

               <hr/>

               <span>简介：</span>
            </div>
        )
    }
}