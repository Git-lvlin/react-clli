/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import api from '@/api/index.js'
import '@/assets/css/cnode.css'


export default class Cnode extends React.Component{
    constructor(props){
        super(props)
        this.state={
            tabs:[
                { id: 1, tab: '', label: '全部' },
                { id: 2, tab: 'good', label: '精华' },
                { id: 3, tab: 'ask', label: '问答' },
                { id: 4, tab: 'share', label: '分享' },
                { id: 5, tab: 'job', label: '招聘' }
            ],
            per:0,
            newData:[],
            pageArr:[1,2,3,4,5],
            page:1,
            current:0,//当前索引
            cur:1//当前索引
        }
    }

    init(tab){
        let { page }=this.state
            const params={
            page:page,
            tab:tab,
            limit:6,
            mdrender: false
        }
        api.Topics(params).then(res=>{
            console.log(res)
            this.setState({newData:[...res]})    
        })
    }

    componentDidMount(){//接口调用的生命周期
       this.init()
    }

    nav(tab,idx){//tabel切换
        this.setState({page:1,current:idx,cur:1})
        this.init(tab)
    }


    pages(){//自增自减显示的内容
        let { page }=this.state
        console.log(page)
        page<=3?this.setState({pageArr:[1,2,3,4,5]}):this.setState({pageArr:[page-2,page-1,page,page+1,page+2]})
    }
    
    per(){//上一页
        let { page }=this.state
        setTimeout(()=>{
            this.pages()
            this.setState(state=>({page:state.page-1,cur:state.cur-1}))
            this.init()
        },0)
        if(page<=1){
            alert('已经是第一页了')
        }
    }
    next(){//下一页
        setTimeout(()=>{
            this.pages()
            this.setState(state=>({page:state.page+1,cur:state.cur+1}))
            this.init()
        },0)
    }

    paging(ele){//点击切换分页
        setTimeout(()=>{
            this.setState({page:ele,cur:ele})
            this.init()
        },0)
    }

    time(date){//时间搓处理
        var day=(Date.now()-Date.parse(date))/(24*60*60*1000)
        return day>1? (day>30?(Math.round(day/30)+'个月前'):(Math.round(day)+'天前')):(day*24>1?(Math.round(day*24)+'小时前'):(Math.round(day*24*60)+'分钟前'))
    }

    render(){
        let { tabs,newData, pageArr,current,cur}=this.state
        console.log(newData)
        return (
            <div>
            {/* table */}
              <div className="cates">
              {
                  tabs.map((ele,idx)=>(
                      <a key={ele.id} className={current===idx?'on':''} onClick={()=>this.nav(ele.tab,idx)}>
                        {ele.label}
                      </a>
                  ))
              }
              </div>
              {/* 列表 */}
               <div className="article-list">
                  {
                    newData.map(ele=>(
                        <div className="article" key={ele.id}>
                            <img src={ele.author.avatar_url}/>
                            <div className='num'>
                                <span>{ele.reply_count}</span>
                                <span>/</span>
                                <span>{ele.visit_count}</span>
                            </div>
                            <span className={ele.top?'label on':'label'}>{ele.top?'顶置':ele.tab}</span>
                            <span className='title'>{ele.title}</span>
                            <span className='time'>{this.time(ele.last_reply_at)}</span>
                        </div>
                    ))
                  }
                </div>
                {/* 分页 */}
                    <div className='pages'>
                        <span onClick={()=>this.per()}>{'<<<'}</span>
                        {cur>3?<span>...</span>:''}
                        {
                            pageArr.map((ele,idx)=>(
                                <span onClick={()=>this.paging(ele)} className={cur===ele?'on':''} key={idx}>{ele}</span>
                            ))
                        }
                        <span>...</span>
                        <span onClick={()=>this.next()}>{'>>>'}</span>
                    </div>
            </div>
        )
    }
}