import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";



import Getstart from "../Components/Getstart";
import Signin from "../Components/Signin";
import Signup from "../Components/Signup";
import Home from "../Components/Home/Home";
import AdminHome from "../Components/AdminHome";
import AddItem from "../Components/AddItem";
import Account from "../Components/Account";



function router() {
    const router = createBrowserRouter([
      {
        path: "/",
        element: <Getstart/>,
      },
      {
        path: "/Signup",
        element: <Signup/>,
      },
      {
          path: "/Signin",
          element: <Signin/>,
        },
        {
          path:'/home',
          element:<Home/>
        },
        {
          path:'/adminHome',
          element:<AdminHome/>
        },
        {
          path:'/adminItem',
          element:<AddItem/>
        },
        {
          path:'/Account',
          element:<Account/>
        },
        {
          path:'/Home1',
          element:<Home/>
        }
       
    ]);
  
    return <RouterProvider router={router} />;
  }
  
  export default router;