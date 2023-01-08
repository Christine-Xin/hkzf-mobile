import React from 'react'
import {NavBar} from 'antd-mobile'
import './index.scss'
import {createBrowserHistory} from 'history'


const CityList=()=>{
    // 初始化history
    const history = createBrowserHistory({window})
    const goBack=()=>{
        history.go(-1)
    }
    return (
        <div className='citylist'>
            <NavBar onBack={goBack}>城市选择</NavBar>
        </div>
    )
}

export default CityList;