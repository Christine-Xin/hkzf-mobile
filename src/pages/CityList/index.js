import React, { useEffect, useState ,useRef} from 'react'
import {NavBar} from 'antd-mobile'
import './index.scss'
import {createBrowserHistory} from 'history'
import axios from 'axios'
import {getCurrentCity} from '../../utils/index'
// import List from 'react-virtualized/dist/commonjs/List';
import {AutoSizer, List} from 'react-virtualized';


const CityList=()=>{
    const [cityArr, setCityArr]=useState({});
    const [cityIndexArr, setCityIndexArr]=useState([]);
    const [indexActive,setIndexActive]=useState("#");
    const TITLE_HEIGHT = 36 // 索引（A,B等）的高度
    const NAME_HEIGHT = 50 // 每个城市名称的高度
    const listRef=useRef()
    // 初始化history
    const history = createBrowserHistory({window})
    const goBack=()=>{
        history.go(-1)
    }
    // 组件首次渲染时
    useEffect(()=>{
        getCityList();
        
    },[])
    // 获取城市列表数据
    const getCityList=async ()=>{
        const res= await axios.get('http://localhost:8080/area/city?level=1')
        let {cityList,cityIndex}=formatCityData(res.data.body)
        // 获取热门城市数据
        const hotRes= await axios.get('http://localhost:8080/area/hot')
        if(hotRes.data.status===200){
            cityList['hot']=hotRes.data.body
            cityIndex.unshift('hot')
        }
        // 获取当前城市
        const curCity=await getCurrentCity()
        cityList['#']=[curCity]
        cityIndex.unshift('#')

        console.log(cityList,cityIndex,curCity)
        
        setCityArr(cityList)
        setCityIndexArr(cityIndex);
        // 调用measureAllRows提前计算list中每一行的高度；实现scrollToRow的精确跳转
        listRef.current.measureAllRows()
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
    // 格式化城市字母索引
    const formatCityIndex=(letter)=>{
        switch(letter){
            case '#':
                return '当前定位';
            case 'hot':
                return '热门城市';
            default:
                return letter.toUpperCase();
        }
    }
    // 动态获取每一行高度:标题索引高度+城市数量*城市名称的高度
    const getRowHeight=({index})=>{
        const letter= cityIndexArr[index]
        const nameLength=cityArr[letter].length
        return TITLE_HEIGHT + NAME_HEIGHT * nameLength
    }
    const rowRenderer=({
        key, // Unique key within array of rows
        index, // 索引号
        isScrolling, // 当前项是否在滚动中
        isVisible, // 当前项是否可见
        style, // 样式对象
      }) =>{
        // 获取每一行的字母索引
        const letter= cityIndexArr[index]
        return (
          <div key={key} style={style} className="city">
            <div className='title'>{formatCityIndex(letter)}</div>
            {
                cityArr[letter].map((item)=>(
                    <div className='name' key={item.value}>{item.label}</div>
                ))
            }
            
          </div>
        );
      }
      /**
       * 将获取到的citylist和cityindex添加为组件得状态
       * 修改list组件得rowCount为citylist数组得长度
       * 将rowRender函数，添加到组件中，以便在函数中获取状态数据citylist和cityindex
       * 修改list组件得rowrender为组件中的rowrender方法
       * 修改rowrendder方法中渲染每行结构和样式
       * 修改list组件的rowheighr函数，动态计算每一行的高度（因为每一行高度不同）
       */
    //   获取当前索引
    const getActiveIndex=(val,index)=>{
        console.log(listRef,index)
        setIndexActive(val); // 设置当前字母索引
        listRef.current.scrollToRow(index); //将list组件置顶
    }
    // 用于获取list组件中渲染的行信息
    const onRowsRendered=({startIndex})=>{
        const letter= cityIndexArr[startIndex]
        if(letter!==indexActive){
            setIndexActive(letter)
        }
    }
    return (
        <div className='citylist'>
            <NavBar onBack={goBack}>城市选择</NavBar>
            {/* 城市列表 */}
            <AutoSizer>
                {({height,width})=>(
                    <List
                        ref={listRef}
                        width={width}
                        height={height}
                        rowCount={cityIndexArr.length}
                        scrollToAlignment="start"
                        rowHeight={getRowHeight}
                        rowRenderer={rowRenderer}
                        onRowsRendered={onRowsRendered}
                    />
                )}
            </AutoSizer>
            {/* 右侧索引列表 */}
            <ul className='city-index'>
                {
                    cityIndexArr.map((item,index)=>(
                        <li className='city-index-item' key={item} onClick={()=>getActiveIndex(item,index)}>
                            <span className={indexActive===item?'index-active':''}>{item==='hot'?'热':item==='#'?'#':item.toUpperCase()}</span>
                        </li>
                    ))
                }
                
            </ul>
        </div>
    )
}

export default CityList;
