import React from 'react'
// import * as echarts from 'echarts';
// import 'echarts-gl';
// var ROOT_PATH = 'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples';

// var chartDom = document.getElementById('main');
// var myChart = window.echarts.init(chartDom);
// var option;

// // eslint-disable-next-line no-undef
// $.getJSON(ROOT_PATH + '/data-gl/asset/data/flights.json', function(data) {

//     function getAirportCoord(idx) {
//         return [data.airports[idx][3], data.airports[idx][4]];
//     }
//     var routes = data.routes.map(function(airline) {
//         return [
//             getAirportCoord(airline[1]),
//             getAirportCoord(airline[2])
//         ];
//     });

//     myChart.setOption({
//         backgroundColor: '#000',
//         globe: {
//             baseTexture: ROOT_PATH + '/data-gl/asset/world.topo.bathy.200401.jpg',
//             heightTexture: ROOT_PATH + '/data-gl/asset/bathymetry_bw_composite_4k.jpg',

//             shading: 'lambert',

//             light: {
//                 ambient: {
//                     intensity: 0.4
//                 },
//                 main: {
//                     intensity: 0.4
//                 }
//             },

//             viewControl: {
//                 autoRotate: false
//             }
//         },
//         series: {

//             type: 'lines3D',

//             coordinateSystem: 'globe',

//             blendMode: 'lighter',

//             lineStyle: {
//                 width: 1,
//                 color: 'rgb(50, 50, 150)',
//                 opacity: 0.1
//             },

//             data: routes
//         }
//     });
// });

// option && myChart.setOption(option);

export default props=>{
    return(
        <div id="main">
            3D地球
        </div>
    )
}