import React from 'react';
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { OR,MBut,DEL,Search,UserText1,UserText2,UserAge,CheckBox,OpenLi,EmerBtn,Btn,LiBTN,Table_patients } from './components';

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

  const handleButton3 = () => {
    // Navigate to the desired page
    navigate('/Add_Report');
  };

  return (
    <div className='App'>
    <button onClick={handleButton1} >go to patient analysis page</button>
    <button onClick={handleButton2} >go to Doctor View page</button>
    <button onClick={handleButton3} >go to ADD report page</button>
     <QueryClientProvider client= {queryClient}>
      <LayoutComponent/>
  
    </QueryClientProvider>                            
    
    </div>
  )

}

export default App




