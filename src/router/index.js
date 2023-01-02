import {Navigate} from 'react-router-dom'
import Home from '../pages/Home'
import CityList from '../pages/CityList';
import News from '../pages/News';

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
            }
        ]
    },
    {
        path:"/citylist",
        element:<CityList/>
    }
]

export default baseRouter;