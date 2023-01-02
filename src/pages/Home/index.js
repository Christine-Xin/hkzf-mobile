import React,{useState} from 'react'
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


const Home = () => {
    const tabs = [{
            key: 'home',
            title: '首页',
            icon: < AppOutline /> ,
            badge: Badge.dot,
        },
        {
            key: 'todo',
            title: '找房',
            icon: < UnorderedListOutline /> ,
            badge: '5',
        },
        {
            key: 'message',
            title: '资讯',
            icon: (active) =>
                active ? < MessageFill /> : < MessageOutline /> ,
            badge: '99+',
        },
        {
            key: 'personalCenter',
            title: '我的',
            icon: < UserOutline /> ,
        },
    ]
    const [activeKey, setActiveKey] = useState('todo')
    return ( 
        <div className='home'>
            {/* 渲染子路由 */ } 
            <Outlet /> 
            {/* tabBar */ }
            <TabBar activeKey={activeKey} onChange={value=>setActiveKey(value)}>
                {tabs.map((item) => (
                    <TabBar.Item key={item.key} icon={item.icon} title={item.title} badge={item.badge}></TabBar.Item>
                ))}
            </TabBar>
        </div>
    )
}
export default Home;