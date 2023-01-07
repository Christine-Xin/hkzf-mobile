import React,{useEffect, useState} from 'react'
import {useNavigate,useLocation} from 'react-router-dom'
import './index.css'
import {
    Outlet
} from 'react-router-dom'
import {
    Badge,
    TabBar
} from 'antd-mobile'
import {
    AppOutline,
    MessageOutline,
    MessageFill,
    UnorderedListOutline,
    UserOutline,
} from 'antd-mobile-icons'


const Home = (props) => {
    // 初始化路由
    const navigateTo=useNavigate()
    const location=useLocation()
    const {pathname}=location

    const tabs = [{
            key: '/home/index',
            title: '首页',
            icon: < AppOutline /> ,
            badge: Badge.dot,
        },
        {
            key: '/home/list',
            title: '找房',
            icon: < UnorderedListOutline /> ,
            badge: '5',
        },
        {
            key: '/home/news',
            title: '资讯',
            icon: (active) =>
                active ? < MessageFill /> : < MessageOutline /> ,
            badge: '99+',
        },
        {
            key: '/home/profile',
            title: '我的',
            icon: < UserOutline /> ,
        },
    ]
    const [activeKey, setActiveKey] = useState(pathname); //刷新当前页，以当前路由路径为tabbar得初始页
    const changeTabBar=(value)=>{
        console.log(value,'change')
        setActiveKey(value);
        navigateTo(value)
    }
    // 监听路由的变化
    useEffect(()=>{
        setActiveKey(pathname)
    },[pathname])

    return ( 
        <div className='home'>
            {/* 渲染子路由 */ } 
            <Outlet /> 
            {/* tabBar */ }
            <TabBar activeKey={activeKey} onChange={changeTabBar} className="footer">
                {tabs.map((item) => (
                    <TabBar.Item key={item.key} icon={item.icon} title={item.title} badge={item.badge}></TabBar.Item>
                ))}
            </TabBar>
        </div>
    )
}
export default Home;