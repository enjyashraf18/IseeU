import React from 'react';
import "./App.css";
import {QueryClient, QueryClientProvider} from "react-query"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { LayoutComponent, Login} from "./pages"
import { ProSide } from './components';

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
      <LayoutComponent/>
  
    </QueryClientProvider>
    )
}

export default App




