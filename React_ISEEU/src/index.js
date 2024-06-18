import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
<<<<<<< HEAD
import {Patient_Analysis,Doctor_View,Report} from "./pages";
=======
import {Patient_Analysis,Doctor_View,Login,Register,LayoutComponent } from "./pages";
>>>>>>> main

import{
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import { Register2 } from "./pages";
  const router = createBrowserRouter([
<<<<<<< HEAD
   {
=======
 
    {

>>>>>>> main
      path: "/",
      element: <App/>
    },
    {
<<<<<<< HEAD
=======
      path: "/RegisterPage2",
      element: <Register2/>
    },

      {
>>>>>>> main
      path: "/patient_table",
        element:<Patient_Analysis />      
      },
       
      {
        path: "/Doctor_View",
        element: <Doctor_View/>
      },
      {
<<<<<<< HEAD
        path: "/Add_Report",
        element: <Report/>
      },
=======
        path: "/",
        element: <App/>
      },
       {
          path: "/login",
          element: <Login/>
        },
        {
          path: "/register",
          element: <Register/>
        },
        {
          path: "/layout",
          element: <LayoutComponent/>
        }
>>>>>>> main
  ]);
// ReactDOM.render(<App/>,document.getElementById("root"));
const root=ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <RouterProvider router={router}/>
)