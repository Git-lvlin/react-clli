//【mobox6】定义子Store的第一种写法
// import { makeAutoObservable } from 'mobx'

// export default class TodoStore{
//     //makeAutoObservable的作用是把下面的数据挂载到TodoStore的实列上
//     constructor(){
//         makeAutoObservable(this)
//     }
//     //相当于vuex中的state
//     msg="共享mobx数据"
    
//     //需要共享的状态组件
//     //相当于vuex中的mutations和actions
//     changeMsg(payload){
//         this.msg=payload
//     }

//     //相当于vuexzho的getters
//     //当msg发生变化，它重新计算
//     get getMsgLength(){
//         return this.msg.length
//     }
// }



//【mobox6】定义子Store第二种写法
//action,computed,observable这些都是修饰符
//action表示把一个方法变成action，它可以直接修改observable变量
//observable 它用于把一个变量变成可观察的，当它变化时，在观察者中可以自动更新
//computed 用于get操作，是计算属性，当它所关联的observable变量发生变化时，在观察者中可以自动更新
import {makeObservable,action,computed,observable} from 'mobx'
export default class TodoStore{
    constructor(){
        makeObservable(this,{//决定哪些需要用到
            list:observable,//渲染todolist的列表数组
            msg:observable,//改变的数据
            changeMsg:action,//改变数据的方法
            updateList:action,
            getMsgLength:computed
        })
    }
    msg="共享mobx数据"
    list=[]//渲染todolist的列表数组
    changeMsg(payload){
        this.msg=payload
    }

    //todolist添加删除编辑共用方法
    updateList(payload){
        switch (payload.type) {
            case 'add':
                this.list.push(payload.data)
                break;
            case 'del':
                this.list=this.list.filter(ele=>ele.id!==payload.ele.id)
                break;
            case 'edit':
                this.list.map((ele,idx)=>{
                    if(ele.id==payload.data.id){
                        this.list[idx].task=payload.data.task
                    }
                })
                break;
            default:
                break;
        }
    }
    //相当于计算属性
    get getMsgLength(){
        const s=this.handleString(this.msg)
        return s.length
    }
    //Mobx中的业务方法，不参与action和计算属性
    handleString(str){
        return str.replace(/\s/img,'')
    }
}


//【mobox5】定义子Store的写法
// import {action,computed,observable} from 'mobx'
// export default class TodoStore{
//     @observable
//     msg="~~mobx5"
//     @action
//     changeMsg(payload){
//         this.msg=payload
//     }
//     @computed
//     get getMsgLength(){
//         const s=this.handleString(this.msg)
//         return s.length
//     }
//     handleString(){
//         return str.replace(/\s/img,'')
//     }
// }
