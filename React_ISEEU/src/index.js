import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';


import {
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
    }
   /**  {
        path: "",
        element: <ICU/>
      },
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