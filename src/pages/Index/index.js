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
    const [groups,setGroups] = useState([])
    const navigate=useNavigate()
    // 获取轮播图
    const getSwipers=async ()=>{
        const res=await axios.get('http://localhost:8080/home/swiper')
        console.log(res)
        if(res.data.status===200){
            setSwipers(res.data.body)
        }
    }
    // 获取租房小组
    const getGroups=async()=>{
        const res= await axios.get('http://localhost:8080/home/groups',{
            params:{
                area:'AREA%7C88cff55c-aaa4-e2e0'
            }
        })
        console.log(res)
        if(res.data.status===200){
            setGroups(res.data.body)
        }
    }
    // 组件首次渲染时请求
    useEffect(()=>{
        getSwipers();
        getGroups();
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
            {/* 租房小组 */}
            <div className="groups">
                <div className="title">
                    <div>租房小组</div>
                    <div className="more">更多</div>
                </div>
                <Grid columns={2}>
                {
                    groups.map((item)=>(
                        <Grid.Item key={item.id} className="groupItem">
                            <div>
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </div>
                            <Image src={`http://localhost:8080${item.imgSrc}`} width={40} height={40}/>
                        </Grid.Item>
                    ))
                }
            </Grid>
            </div>
            
        </div>
    )
}

export default Index;