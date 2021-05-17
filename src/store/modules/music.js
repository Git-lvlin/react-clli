import {makeObservable,observable,action} from 'mobx'

import  api  from '@/api'

class MusicStore{
    constructor(){
        makeObservable(this,{
            list:observable,
            updateList:action
        })
    }
    //state
    list=[]
    //action
    updateList(payload){
        //调用接口
        // this.list=this.fetch(payload)
        api.Music(payload).then(res=>{
        this.list=res.song.list
        })
    }
    // async fetch(params){//调用接口方法
    //     const res=await Music(params)
    //     return res
    // }
}

class store{
    constructor(){
        this.mic=new MusicStore()
    }
}

export default new store()   //实例化抛出