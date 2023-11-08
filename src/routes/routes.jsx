import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main/Main";
import Home from "../pages/Home/Home";
import QRScanner from "../pages/QRScanner/QRScanner";

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
                element:<QRScanner/>
            }
        ]
    }
])

export default router