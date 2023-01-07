import React, { useEffect, useState } from "react";
import {Button,Space,Toast,Swiper, Image, Grid} from 'antd-mobile'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import './index.css'
import Nav1 from '../../assets/images/nav-1.png'
import Nav2 from '../../assets/images/nav-2.png'
import Nav3 from '../../assets/images/nav-3.png'
import Nav4 from '../../assets/images/nav-4.png'


const Index=()=>{

    const [swipers,setSwipers]= useState([]);
    const navigate=useNavigate()

    const getSwipers=async ()=>{
        const res=await axios.get('http://localhost:8080/home/swiper')
        console.log(res)
        if(res.data.status===200){
            setSwipers(res.data.body)
        }
    }
    useEffect(()=>{
        getSwipers()
    },[])

    const navs= [
        {
           text:'整租',
           imgsrc:Nav1,
           path:'/home/list'
        },
        {
            text:'合租',
            imgsrc:Nav2,
            path:'/home/list'
        },
        {
            text:'地图找房',
            imgsrc:Nav3,
            path:'/map'
        },
        {
            text:'去出租',
            imgsrc:Nav4,
            path:'/rent'
        }
    ]
    // 渲染导航菜单
    const renderNavs=(val)=>{
        console.log(val)
        navigate(val)
    }
    return (
        <div>
            {/* 轮播图 */}
            <Swiper loop autoplay style={{height:150}}>
                {
                    swipers.map((item,index)=>(
                        <Swiper.Item key={index}>
                            <div style={{height:150}}>
                                <Image src={'http://localhost:8080'+ item.imgSrc} fit='cover'></Image>
                            </div>
                        </Swiper.Item>
                    ))
                }
            </Swiper>
            {/*  导航菜单*/}
            <Grid columns={4} className="navs">
                {
                    navs.map((item,index)=>(
                        <Grid.Item key={index} className="navItem" onClick={()=>renderNavs(item.path)}>
                            <Image src={item.imgsrc} width={40} height={40}/>
                            <div>
                                {item.text}
                            </div>
                        </Grid.Item>
                    ))
                }
            </Grid>
        </div>
    )
}

export default Index;