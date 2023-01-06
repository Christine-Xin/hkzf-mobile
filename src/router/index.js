import {Navigate} from 'react-router-dom'
import Home from '../pages/Home'
import CityList from '../pages/CityList';
import News from '../pages/News';
import Profile from '../pages/Profile';
import Index from '../pages/Index';
import HouseList from '../pages/HouseList';

const baseRouter=[
    {
        path:'/',
        element:<Navigate to="/home"/>
    },
    {
        path:"/home",
        element:<Home/>,
        children:[
            {
                path:'news',
                element:<News/>
            },
            {
                path:'index',
                element:<Index/>
            },
            {
                path:'profile',
                element:<Profile/>
            },
            {
                path:'list',
                element:<HouseList/>
            }
        ]
    },
    {
        path:"/citylist",
        element:<CityList/>
    }
]

export default baseRouter;