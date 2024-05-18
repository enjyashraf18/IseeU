import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Patient_Analysis} from "./pages";

import{
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
  const router = createBrowserRouter([
   {
      path: "/",
      element: <App/>
    },
    {
      path: "/patient_table",
        element:<Patient_Analysis />      
      },
      /** ,
      {
        path: "Sign",
        element: <Sign/>
      },*/
  ]);
// ReactDOM.render(<App/>,document.getElementById("root"));
const root=ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <RouterProvider router={router}/>
)