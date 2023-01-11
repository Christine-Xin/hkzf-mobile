import React, { useEffect } from "react";
import './index.scss';
import NavHeader from "../../components/NavHeader";
import styles from "./index.module.css"
import axios from "axios";

const Map=()=>{
    // 获取当前城市
    const {label,value}=JSON.parse(localStorage.getItem('hkzf_city'))
    useEffect(()=>{
        creatMap();
    },[])
    // 获取城市下得所有区数据
    const getArea= async ()=>{
        const res=await axios.get(`http://localhost:8080/area/map?id=${value}`)
        console.log(res)
        return Promise.resolve(res.data.body)
    }
    const creatMap=()=>{
        // 初始化地图实例
        // 注意：在react脚手架中全局对象需要使用window来访问，否则，会造成eslint校验错误
        const map =  new window.BMapGL.Map("container");
        // 设置中心点坐标
        // const point = new window.BMapGL.Point(116.404,39.915)
        // 初始化地图
        // map.centerAndZoom(point, 15); 
        var myGeo = new window.BMapGL.Geocoder();
        myGeo.getPoint(label, async (point)=>{
            if(point){
                // 初始化地图
                map.centerAndZoom(point, 11);
                map.addControl(new window.BMapGL.ScaleControl()); // 添加比例尺控件
                map.addControl(new window.BMapGL.ZoomControl()); // 添加缩放控件
                // 创建文本覆盖物
                // const opts={
                //     position:point,
                //     offset: new window.BMapGL.Size(-35,-35), //设置覆盖物中心点偏移
                // }
                // const label= new window.BMapGL.Label('文本覆盖物',opts)
                // label.setContent(`
                //     <div class="${styles.bubble}">
                //         <p class="${styles.name}">浦东</p>
                //         <p>0套</p>
                //     </div>
                // `)
                // label.setStyle({
                //     cursor:'pointer',
                //     border:'0px solid rgb(255,0,0)',
                //     padding:'0px',
                //     whiteSpace:'nowrap',
                //     fontSize:'12px',
                //     color:'rgb(255,255,255)',
                //     textAlign:'center'
                // })
                // label.addEventListener('click',()=>{
                //     console.log('房源')
                // })
                // map.addOverlay(label)
                const res= await axios.get(`http://localhost:8080/area/map?id=${value}`)
                console.log('获取房源信息',res)
                res.data.body.forEach(item=>{
                   
                    const {coord:{latitude,longitude}, label:areaName,count, value}=item
                    const areaPoint=new window.BMapGL.Point(longitude,latitude)

                    const label= new window.BMapGL.Label('',{
                        position:areaPoint,
                        offset: new window.BMapGL.Size(-35,-35), //设置覆盖物中心点偏移
                    })
                    console.log(123,latitude,longitude,areaName,count)
                    label.setContent(`
                        <div class="${styles.bubble}">
                            <p class="${styles.name}">${areaName}</p>
                            <p>${count}套</p>
                        </div>
                    `)
                    label.id=value
                    label.setStyle({
                        cursor:'pointer',
                        border:'0px solid rgb(255,0,0)',
                        padding:'0px',
                        whiteSpace:'nowrap',
                        fontSize:'12px',
                        color:'rgb(255,255,255)',
                        textAlign:'center'
                    })
                    label.addEventListener('click',()=>{
                        console.log('房源',label.id)
                        // 放大地图，以当前点击得覆盖物为中心放大
                        map.centerAndZoom(areaPoint,13)
                        // 清除当前覆盖物
                        map.clearOverlays()
                    })
                    map.addOverlay(label)
                })
            }else{
                alert('您选择的地址没有解析到结果！');
            }
        }, label)
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