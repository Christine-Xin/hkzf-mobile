// 根组件（配置路由信息）
import React from 'react'
import {BrowserRouter as Router, Routes,Route, Link,useRoutes} from 'react-router-dom'
import router from './router'


function App() {
  const routes= useRoutes(router)
  return (
      <div className="App">
        {routes}
      </div>

  );
}

export default App;
