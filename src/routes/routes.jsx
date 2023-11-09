import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main/Main";
import Home from "../pages/Home/Home";
import Scanner from "../pages/Scanner/Scanner";


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
            }
        ]
    }
])

export default router