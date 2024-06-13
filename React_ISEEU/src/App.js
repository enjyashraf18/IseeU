import React from 'react';
import "./App.css";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { Login} from "./pages"

const queryClient = new QueryClient();

const App = (props) => {
  const navigate = useNavigate();
  const handleButton1 = () => {
    // Navigate to the desired page
    navigate('/patient_table');
  };
  const handleButton2 = () => {
    // Navigate to the desired page
    navigate('/Doctor_View');
  };

  return (
    <QueryClientProvider client= {queryClient}>

    <Login/>
    </QueryClientProvider>
    )
}

export default App




