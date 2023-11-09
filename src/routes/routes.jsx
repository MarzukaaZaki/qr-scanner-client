import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main/Main";
import Home from "../pages/Home/Home";
import Scanner from "../pages/Scanner/Scanner";
import Login from "../pages/Login/Login";


const router = createBrowserRouter([
    {
        path:'/',
        element: <Main/>,
        children:[
            {
                path:'/',
                element: <Home/>
            },
            {
                path:'/scanner',
                element:<Scanner/>
            },
            {
                path:'/login',
                element: <Login/>
            }
        ]
    }
])

export default router