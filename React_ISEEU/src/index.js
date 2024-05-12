import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>
    },
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