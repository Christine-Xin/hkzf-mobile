import React, { useEffect, useState } from "react";
import {Button,Space,Toast,Swiper, Image, Grid,List,Input} from 'antd-mobile'
import { EnvironmentOutline,DownFill,SearchOutline} from 'antd-mobile-icons'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import './index.scss'
import Nav1 from '../../assets/images/nav-1.png'
import Nav2 from '../../assets/images/nav-2.png'
import Nav3 from '../../assets/images/nav-3.png'
import Nav4 from '../../assets/images/nav-4.png'


const Index=()=>{

    const [swipers,setSwipers]= useState([]);
    const [groups,setGroups] = useState([]);
    const [news,setNews]=useState([]); 
    const [place,setPlace]=useState("");

    const navigate=useNavigate()
    // 获取轮播图
    const getSwipers=async ()=>{
        const res=await axios.get('http://localhost:8080/home/swiper')
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
        if(res.data.status===200){
            setGroups(res.data.body)
        }
    }
    // 获取最新资讯
    const getNews= async ()=>{
        const res= await axios.get('http://localhost:8080/home/news',{
            params:{
                area:'AREA|88cff55c-aaa4-e2e0'
            }
        })
        console.log(res)
        if(res.data.status===200){
            setNews(res.data.body)
        }
    }
    // 组件首次渲染时请求
    useEffect(()=>{
        getSwipers();
        getGroups();
        getNews();
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
        navigate(val)
    }
    return (
        <div>
            {/* 轮播图 */}
            <div className="swiperDiv">
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
                {/* 顶部导航 */}
                <div className="searchDiv">
                    <div className="search">
                        <div className="location">
                            <span>上海</span>
                            <DownFill />
                        </div>
                        <div className="form">
                            <SearchOutline />
                            <Input
                                placeholder='请输入小区或地址'
                                value={place}
                                clearable
                                />
                        </div>
                    </div>
                    <div className="icon">
                        <EnvironmentOutline color='#fff'/>
                    </div>
                </div>
            </div>
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
            {/* 最新资讯 */}
            <div className="news">
                <div className="title">
                    最新资讯
                </div>
                <List>
                    {
                        news.map((item)=>(
                            <List.Item key={item.id} className="newsItem"
                                prefix={
                                    <Image src={`http://localhost:8080${item.imgSrc}`} width={50} height={50} fit='cover'></Image>
                                }
                            >
                                <div  className="right">
                                   <div className="title">{item.title}</div> 
                                   <div className="desc">
                                        <span>{item.from}</span>
                                        <span>{item.date}</span>
                                   </div>
                                </div>
                            </List.Item>
                        ))
                    }
                </List>
            </div>
            
        </div>
    )
}

export default Index;