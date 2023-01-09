import React, { useEffect } from 'react'
import {NavBar} from 'antd-mobile'
import './index.scss'
import {createBrowserHistory} from 'history'
import axios from 'axios'
import {getCurrentCity} from '../../utils/index'


const CityList=()=>{
    // 初始化history
    const history = createBrowserHistory({window})
    const goBack=()=>{
        history.go(-1)
    }
    // 组件首次渲染时
    useEffect(()=>{
        getCityList()
    },[])
    // 获取城市列表数据
    const getCityList=async ()=>{
        const res= await axios.get('http://localhost:8080/area/city?level=1')
        console.log(res)
        let {cityList,cityIndex}=formatCityData(res.data.body)
        // 获取热门城市数据
        const hotRes= await axios.get('http://localhost:8080/area/hot')
        if(hotRes.data.status===200){
            cityList['hot']=res.data.body
            cityIndex.unshift('hot')
        }
        // 获取当前城市
        const curCity=await getCurrentCity()
        cityList['#']=[curCity]
        cityIndex.unshift('#')
        console.log(cityList,cityIndex,curCity)
    }
    // 城市数据格式化
    /**
     * 1:遍历后端给到的城市数据
     * 2：获取每一个城市得首字母
     * 3：判断citylist中是否有该分类
     * 4：如果有，直接往该分类中push数据
     * 5：如果没有，就先创建一个数组，然后，把当前城市信息添加到数组中
     */
    const formatCityData=(list)=>{
        let cityList={}
        let cityIndex=[]
        list.map(item => {
            if(!cityList[item.short[0]]){
                cityIndex.push(item.short[0])
                cityList[item.short[0]]=[]
                cityList[item.short[0]].push(item)
            }else{
                cityList[item.short[0]].push(item)
            }
        })
        
        cityIndex=cityIndex.sort()
        return {
            cityList,
            cityIndex,
        }
    }
    return (
        <div className='citylist'>
            <NavBar onBack={goBack}>城市选择</NavBar>
        </div>
    )
}

export default CityList;
