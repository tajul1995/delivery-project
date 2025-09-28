import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home/Home/Home";
import Coverage from "../pages/Home/Home/Coverage";
import SendAParcel from "../pages/SendAParcel/SendAParcel";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children:[
        {
            path:'/',
            element:<Home></Home>,
        },
        {
          path:'/coverage',
          element:<Coverage></Coverage>
        },
        {
          path:'/parcelSend',
          element:<SendAParcel></SendAParcel>
        }
    ]
  },
]);

export default router
