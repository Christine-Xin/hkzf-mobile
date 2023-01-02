import React from 'react'
import {Outlet} from 'react-router-dom'

export default class Home extends React.Component{
    render(){
        return <div>
            首页
            <Outlet />
        </div>
    }
}