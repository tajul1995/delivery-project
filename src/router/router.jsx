import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    
  },
]);

export default router
