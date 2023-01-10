import React, { useEffect } from "react";
import {NavBar} from 'antd-mobile'
import {createBrowserHistory} from 'history';
import './index.scss'
import propTypes from 'prop-types'

const NavHeader=(props)=>{
    // 初始化history
    const history = createBrowserHistory({window})
    const goBack=()=>{
        history.go(-1)
    }
    useEffect(()=>{
        console.log(props)
    },[])
    return(
        <NavBar onBack={goBack}>{props.title}</NavBar>
    )
}
NavHeader.propTypes={
    title:propTypes.string.isRequired,
}
export default NavHeader