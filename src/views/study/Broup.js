import React from 'react'

//自定义弹窗组件
const YeModel=props=>{
    let { 
            show,   //是否显示弹框
            onClose,  //取消和关闭按钮方法
            tip,  //自定义弹框标题
            showClose,  //是否显示关闭按钮
            showHeader,  //是否显示header
            children,  //弹框的主体内容
            footer, //自定义footer内容
            size,  //自定义弹框大小
            onOk  //确认按钮事件或者删除按钮事件
        }=props

 const renderBtns=()=>{//相当于插槽
        let { type }=props
        type=type||'confirm'
        let arr=[]
        switch (type) {//根据不同的操作显示不同的内容，可以达到复用的效果
            case 'confirm':
                arr=[
                    <span className="cancel" key={1} onClick={()=>onClose&&onClose()}>取消</span>,
                    <span className="confirm" key={2} onClick={()=>onOk&&onOk()}>确定</span>
                ]
                break;
            case 'delete':
                arr=[
                    <span className="cancel" key={1} onClick={()=>onClose&&onClose()}>取消</span>,
                    <span className="delete" key={2} onClick={()=>onOk&&onOk()}>删除</span>
                ]
                break;
            default:
                break;
        }
        return arr
    }
    return(
        //自定义样式类名
        <div className={"ye-model",`ye-model-${size}`} style={{display:(show||false)?'block':'none'}}>
            {
                (showHeader)&& <div className='header'>
                                    <span className="tip">{tip||'提示'}</span>
                                    {/* onClose不传也不会报错 */}
                                    <span className="clone" 
                                    onClick={()=>onClose&&onClose()}
                                    style={{display:showClose?'block':'none'}}
                                    >X</span>
                                </div>
            }
            <div className='body'>
               <div className="wrap">
                  {/* 默认显示父组件标签里的内容 */}
                  {children}
               </div>
            </div>
            <div className='footer' style={{border:((!showHeader)&&'none')}}>
                {/* 不传默认显示原有的底部 */}
                {footer||renderBtns()}
            </div>
         </div>
    )
}



export default class Broup extends React.Component{
    constructor(props){
        super(props)
        this.state={
            show:false,
            username:'',
            visiable:false,
        }
    }
    click(type){//点击显示弹窗
        console.log(type)
        this.setState({[type]:true})
    }
    close(){//关闭弹窗
        this.setState({show:false})
    }

    userModelClose(){//修改用户名关闭方法
        this.setState({
            visiable:false,
            username:''
        })
    }
    submit(){
        console.log('确定提交',this.state)
        this.setState({
            visiable:false,
            username:''
        })
    }
    render(){
        let { show,username,visiable }=this.state
        return (
            <div>
               <h1>组合</h1>
               <button onClick={()=>this.click('show')}>弹出框</button>
               <hr/>
               <YeModel  
                  show={show}
                  onClose={()=>this.close()}
                  tip={'危险'}
                   showClose
                  showHeader={true}
                //   footer={<span style={{borderColor:'blue'}}>牛逼</span>}
                  size={'nb'}
               >
               {/* 在子组件中用children显示 */}
                 <div>我是children1</div>
                 <div>我是children2</div>
               </YeModel>

               <hr/>
               <button onClick={()=>this.click('visiable')}>修改用户名</button>

               <YeModel
                 show={visiable}
                 size='smail'
                 showHeader
                 showClose
                 tip={'修改用户名'}
                 onClose={()=>this.userModelClose()}
                 onOk={()=>this.submit()}
               >
                   <span>用户名：</span>
                   <input type="text"
                    value={username}
                    onChange={e=>this.setState({username:e.target.value})}
                    />
               </YeModel>
            </div>
        )
    }
}