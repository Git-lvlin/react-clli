import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/common.css';
import App from './App';
import { DatePicker } from 'antd';
import 'antd/dist/antd.less'; // or 'antd/dist/antd.less'
// import '../src/assets/less/style.less'


ReactDOM.render(
  // <React.StrictMode>
  <App>
   <DatePicker />
  </App>,
  // </React.StrictMode>,
  document.getElementById('root'),
  document.getElementById('App')
);
