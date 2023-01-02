// 根组件（配置路由信息）
import React from 'react'
import {BrowserRouter as Router, Routes,Route, Link} from 'react-router-dom'
import { Button } from "antd-mobile";
import Home from './pages/Home'
import CityList from './pages/CityList';
import News from './pages/News';

function App() {
  return (
    
    <Router>
      <div className="App">
        <ul>
          <li>
            <Link to="/home">首页</Link>
          </li>
          <li>
            <Link to="/citylist">城市选择</Link>
          </li>
        </ul>
        <Routes>
          <Route path='/home/*' element={<Home/>}>
            <Route path='news' index element={<News/>}></Route>
          </Route>
          <Route path='/citylist' element={<CityList/>}></Route>
        </Routes>
      </div>
      
    </Router>
  );
}

export default App;
