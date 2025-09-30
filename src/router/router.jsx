import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home/Home/Home";
import Coverage from "../pages/Home/Home/Coverage";
import SendAParcel from "../pages/SendAParcel/SendAParcel";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/AuthComponents/Login";
import Register from "../pages/AuthComponents/Register";
import DashBoard from "../layout/DashBoard";
import MyParcels from "../DashBoard/MyParcels";
import PrivateRoute from "../routes/PrivateRoute";
import Payment from "../DashBoard/Payment";


const router = createBrowserRouter([
  {
    path: "/",
    Component:RootLayout,
    children:[
        {
            index:true,
            Component:Home,
        },
        {
          path:'coverage',
          Component:Coverage,
        },
        {
          path:'parcelSend',
          element:<PrivateRoute><SendAParcel></SendAParcel></PrivateRoute>
        }
    ]
  },
  {
    path:'/',
    Component:AuthLayout,
    children:[{
      path:'login',
      Component:Login,
    },
    {
      path:'register',
      Component:Register,
    }
  
  
  
  ]
    
  },
  {
    path:'/dashboard',
    element:<PrivateRoute><DashBoard></DashBoard></PrivateRoute>,
    children:[
      {
        path:'myparcels',
        Component:MyParcels
      },
      {
        path:'payment/:id',
        Component:Payment
      }
    ]
    
  }
]);

export default router
