import React, { useEffect, useState } from "react";
import './index.scss';
import NavHeader from "../../components/NavHeader";
import styles from "./index.module.css"
import axios from "axios";
import {Link,useNavigate} from "react-router-dom"
import HouseItem from "../../components/HouseItem";

const Map=()=>{
    // 获取当前城市
    const {label,value}=JSON.parse(localStorage.getItem('hkzf_city'))
    const [houseList, setHouseList]=useState([])
    const [isShowList,setIsShowList]=useState(false)
    const navigate=useNavigate()
    let map;
    
    useEffect(()=>{
        creatMap();
    },[])
    /**
     * 渲染覆盖物入口
     * 1：接收区域id参数，获取该区域下得房源数据
     * 2：获取房源类型以及下级地图缩放级别
     * 
     */
    const renderOverlays=async (id)=>{
        const res=await axios.get(`http://localhost:8080/area/map?id=${id}`)
        const data=res.data.body
        const {nextZoom, type}=getTypeAndZoom()
        data.forEach(item=>{
            createOverlays(item,nextZoom, type)
        })
    }
    /**
     * 计算要绘制得覆盖物类型和下一个缩放级别
     * 区 -》11， 范围》=10 《12
     * 镇 -》13，范围：》=12 《14
     * 小区 -》15，范围：》=14 《16
     */
    const getTypeAndZoom=()=>{
        const zoom=map.getZoom()
        console.log('当前地图缩放级别',zoom)
        let nextZoom, type
        if(zoom>=10 && zoom<12){
            nextZoom=13
            type='circle'
        }else if( zoom >=12 && zoom <14){
            nextZoom=15
            type='circle'
        }else if(zoom >=14 && zoom <16){
            type="rect"
        }
        return {
            nextZoom, type
        }
    }
    // 创建覆盖物
    const createOverlays=(data,zoom,type)=>{
        const {coord:{latitude,longitude}, label:areaName,count, value}=data
        const areaPoint=new window.BMapGL.Point(longitude,latitude)
        if(type=='circle'){
            createCircle(areaPoint,areaName,count, value,zoom)
        }else if(type=='rect'){
            createRect(areaPoint,areaName,count, value)
        }
    }
    // 创建区，镇覆盖物
    const createCircle=(areaPoint,areaName,count, value,zoom)=>{
        const label= new window.BMapGL.Label('',{
            position:areaPoint,
            offset: new window.BMapGL.Size(-35,-35), //设置覆盖物中心点偏移
        })
        label.id=value
        label.setContent(`
            <div class="${styles.bubble}">
                <p class="${styles.name}">${areaName}</p>
                <p>${count}套</p>
            </div>
        `)
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
            map.centerAndZoom(areaPoint,zoom)
            // 清除当前覆盖物
            map.clearOverlays()
            renderOverlays(label.id)
        })
        map.addOverlay(label)
    }
    // 创建小区覆盖物
    const createRect=(areaPoint,areaName,count, value)=>{
        const label= new window.BMapGL.Label('',{
            position:areaPoint,
            offset: new window.BMapGL.Size(-50,-28), //设置覆盖物中心点偏移
        })
        label.id=value
        label.setContent(`
            <div class="${styles.rect}">
                <span class="${styles.housename}">${areaName}</span>
                <span class="${styles.housenum}">${count}套</span>
                <i class="${styles.arrow}"></i>
            </div>
        `)
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
            getHouseList(label.id)
            
        })
        map.addOverlay(label)
    }
    // 获取小区房源数据
    const getHouseList=async (id)=>{
        const res= await axios.get(`http://localhost:8080/houses?cityId=${id}`)
        setHouseList(res.data.body.list)
        setIsShowList(true)

    }
    const renderHouseList=()=>{
        return houseList.map(item=>(
            <HouseItem
            key={item.houseCode}
            src={`http://localhost:8080${item.houseImg}`}
            title={item.title}
            desc={item.desc}
            tags={item.tags}
            price={item.price}
            onClick={() => navigate(`/detail/${item.houseCode}`)}
            />
        ))
    }
    const creatMap=()=>{
        // 初始化地图实例
        // 注意：在react脚手架中全局对象需要使用window来访问，否则，会造成eslint校验错误
        const newMap =  new window.BMapGL.Map("container");
        map=newMap
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

                // 遍历数据
                // const res= await axios.get(`http://localhost:8080/area/map?id=${value}`)
                // console.log('获取房源信息',res)
                // res.data.body.forEach(item=>{
                   
                //     const {coord:{latitude,longitude}, label:areaName,count, value}=item
                //     const areaPoint=new window.BMapGL.Point(longitude,latitude)

                //     const label= new window.BMapGL.Label('',{
                //         position:areaPoint,
                //         offset: new window.BMapGL.Size(-35,-35), //设置覆盖物中心点偏移
                //     })
                //     console.log(123,latitude,longitude,areaName,count)
                //     label.setContent(`
                //         <div class="${styles.bubble}">
                //             <p class="${styles.name}">${areaName}</p>
                //             <p>${count}套</p>
                //         </div>
                //     `)
                //     label.id=value
                //     label.setStyle({
                //         cursor:'pointer',
                //         border:'0px solid rgb(255,0,0)',
                //         padding:'0px',
                //         whiteSpace:'nowrap',
                //         fontSize:'12px',
                //         color:'rgb(255,255,255)',
                //         textAlign:'center'
                //     })
                //     label.addEventListener('click',()=>{
                //         console.log('房源',label.id)
                //         // 放大地图，以当前点击得覆盖物为中心放大
                //         map.centerAndZoom(areaPoint,13)
                //         // 清除当前覆盖物
                //         map.clearOverlays()
                //     })
                //     map.addOverlay(label)
                // })
                renderOverlays(value)
            }else{
                alert('您选择的地址没有解析到结果！');
            }
        }, label)
    }
    return (
        <div className="map">
            <NavHeader title="地图找房"/>
            {/* 地图容器 */}
            <div id="container">

            </div>
            {/* 房源列表 */}
            <div className={[styles.houseList, isShowList? styles.show:''].join(' ')}>
                <div className={styles.titleWrap}>
                    <h1 className={styles.listTitle}>房屋列表</h1>
                    <Link className={styles.titleMore} to="/home/list">更多房源</Link>
                </div>
                <div className={styles.houseItems}>
                   {renderHouseList()}
                </div>
            </div>
        </div>
    )
}

export default Map;