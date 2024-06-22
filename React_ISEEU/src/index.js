import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';


import {DoctorsAnalysis,NursesAnalysis,Patient_Analysis,Doctor_View,Login,Register,Report,AdmitPatient ,PatientProfile,NurseProfile, AdminView, Loading } from "./pages";

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
      path: "/admindashboard",
      element: <AdminView/>
    },
    {
      path: "/admin/doctorsdata",
      element: <DoctorsAnalysis/>
    },
    {
      path: "/admin/nursesdata",
      element: <NursesAnalysis/>
    },
    {
      path: "/admitpatient",
      element: <AdmitPatient/>
    },
    {

      path: "/RegisterPage2",
      element: <Register2/>
    },

      {

      path: "/currentencounters",
        element:<Patient_Analysis />      
      },
       
      {
        path: "/doctordashboard",
        element: <Doctor_View/>
      },
      {

        path: "/Add_Report",
        element: <Report/>
      },
      {

        path: "/PatientProfile",
        element: <PatientProfile/>
      },
      {

        path: "/nursedashboard",
        element: <NurseProfile/>
      },


      // {
      //   path: "/test",
      //     element:<TestComponent />      
      //   },

      {
        path: "/Doctor_View",
        element: <Doctor_View/>
      },

       {
          path: "/login",
          element: <Login/>
        },
        {
          path: "/register",
          element: <Register/>
        }
        ,
        {
          path: "/loading",
          element: <Loading/>
        }


  ]);
// ReactDOM.render(<App/>,document.getElementById("root"));
const root=ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <RouterProvider router={router}/>
)