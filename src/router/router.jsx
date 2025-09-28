import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home/Home/Home";
import Coverage from "../pages/Home/Home/Coverage";


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
        }
    ]
  },
]);

export default router
