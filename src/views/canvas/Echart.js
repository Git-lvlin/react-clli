/* eslint-disable import/no-anonymous-default-export */
import React,{useEffect,useRef} from 'react'
// import * as echarts from 'echarts';
//引入绘制图表函数
// import goodOptionCreate from './goodOption'
import './style.css'

export default ()=>{
    // const [godData, setGoodData] = useState({})
    //利用ref进行dom操作
    const godRef=useRef(null)
    // 因为是dom操作，要用到副作用
    useEffect(()=>{
        //初始化echarts实例
        var myChart =window.echarts.init(godRef.current);//利用ref获取dom节点
        // 绘制图表
        myChart.setOption(
            {
                title: {
                    text: 'ECharts 入门示例'
                },
                tooltip: {},
                xAxis: {
                    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            }
        )
        return undefined
    },[])//只执行一次

    // let timer = null
    // useEffect(()=>{
	// 	// 触发调接口
	// 	timer = setTimeout(()=>{
	// 		// 来自于调接口的数据
	// 		const data = {
	// 			values: [5, 20, 36, 10, 10, 20],
	// 			title: '本季度商品销售统计'
	// 		}
	// 		setGoodData(data)
	// 	}, 2000)
	// 	return ()=>{
	// 		clearTimeout(timer)
	// 	}
	// }, [])
   
        return(
            <div className="ye-echart">
                <div ref={godRef} id="main">Echart图表</div>
            </div>
        )
}