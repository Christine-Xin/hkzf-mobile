import React, { useEffect, useState } from "react";
import {Button,Space,Toast,Swiper, Image} from 'antd-mobile'
import axios from 'axios'
import './index'


const Index=()=>{
    const colors=['#ace0ff', '#bcffbd', '#e4fabd', '#ffcfac'];

    const [swipers,setSwipers]= useState([]);

    const getSwipers=async ()=>{
        const res=await axios.get('http://localhost:8080/home/swiper')
        console.log(res)
        if(res.data.status==200){
            setSwipers(res.data.body)
        }
    }
    useEffect(()=>{
        getSwipers()
    },[])
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
        </div>
    )
}

export default Index;