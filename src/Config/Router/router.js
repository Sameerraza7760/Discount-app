import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Getstart from "../../pages/Getstarted/Getstart";
import Signin from "../../pages/Accounts/Signin/Signin";
import Signup from "../../pages/Accounts/Signup/Signup";
import Home from "../../Components/Home/Home";
import AdminHome from "../../pages/Adminpanel/Adminhome/AdminHome";
import AddItem from "../../pages/Adminpanel/Adminitem/AddItem";
import Account from "../../pages/Adminpanel/Account/Account";
import UserCart from "../../pages/Userpanel/Usercart/UserCart";
import UserHome from "../../pages/Userpanel/Userhome/UserHome";
import UserSetting from "../../pages/Userpanel/Usersetting/UserSetting";
import AdminOrder from "../../pages/Adminpanel/Order/AdminOrder";
import Adminchat from "../../pages/Adminpanel/Adminchat/Adminchat";
import Userchat from "../../pages/Userpanel/Userchat/Userchat";
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
        },
        {
          path:'/userCart',
          element:<UserCart/>
        },
        {
          path:'/adminOrder',
          element:<AdminOrder/>
        },
       
        {
          path:'/userSetting',
          element:<UserSetting/>
        },
        {
          path:'/adminchat',
          element:<Adminchat/>
        },
        {
          path:'/userchat',
          element:<Userchat/>
        }
       
    ]);
  
    return <RouterProvider router={router} />;
  }
  
  export default router;