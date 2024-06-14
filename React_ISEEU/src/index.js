import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Patient_Analysis,Doctor_View,Login,Register,LayoutComponent } from "./pages";

import{
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import { Register2 } from "./pages";
  const router = createBrowserRouter([
 
    {

      path: "/",
      element: <App/>
    },
    {
      path: "/RegisterPage2",
      element: <Register2/>
    },

      {
      path: "/patient_table",
        element:<Patient_Analysis />      
      },
       
      {
        path: "/Doctor_View",
        element: <Doctor_View/>
      },
      {
        path: "/",
        element: <App/>
      },
       {
          path: "/login",
          element: <Login/>
        },
        {
          path: "register",
          element: <Register/>
        },
        {
          path: "layout",
          element: <LayoutComponent/>
        }
  ]);
// ReactDOM.render(<App/>,document.getElementById("root"));
const root=ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <RouterProvider router={router}/>
)