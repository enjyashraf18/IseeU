import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { Login, Register } from './pages';

import 'bootstrap/dist/css/bootstrap.min.css';


import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
  const router = createBrowserRouter([
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
      }
  ]);
// ReactDOM.render(<App/>,document.getElementById("root"));
const root=ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <RouterProvider router={router}/>
)