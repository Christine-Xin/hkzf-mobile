import React, { useEffect } from "react";
import './index.scss';
import NavHeader from "../../components/NavHeader";

const Map=()=>{
    useEffect(()=>{
        creatMap();
    },[])
    const creatMap=()=>{
        // 初始化地图实例
        // 注意：在react脚手架中全局对象需要使用window来访问，否则，会造成eslint校验错误
        const map =  new window.BMapGL.Map("container");
        // 设置中心点坐标
        const point = new window.BMapGL.Point(116.404,39.915)
        // 初始化地图
        map.centerAndZoom(point, 15); 
    }
    return (
        <div className="map">
            <NavHeader title="地图找房"/>
            <div id="container">

            </div>
        </div>
    )
}

export default Map;