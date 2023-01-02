// 根组件（配置路由信息）
import React from 'react'
import {BrowserRouter as Router, Routes,Route, Link,useRoutes} from 'react-router-dom'
import router from './router'


function App() {
  const routes= useRoutes(router)
  return (
      <div className="App">
        <ul>
          <li>
            <Link to="/home">首页</Link>
          </li>
          <li>
            <Link to="/citylist">城市选择</Link>
          </li>
        </ul>
        {routes}
      </div>

  );
}

export default App;
