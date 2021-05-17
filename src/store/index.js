import TodoStore from './modules/todolist'
import MusicStore from './modules/music'

class Store{//根store
    constructor(){
        //对多个子module进行实列化
        //把需要共享的状态数据挂载到todo上
        this.todo=new TodoStore()
        this.music=new MusicStore()
    }
}

export default new Store()//实例化抛出