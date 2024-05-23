import React, { useState } from 'react';
import "./patientAnalysis.css";
import styles from './patientAnalysis.css';
import { Table_patients,Btn } from '../../components';
const PatientAnalysis = () => {
  const patient_Analysis_data = [
    ["download (2).jfif","shahd","15A","Coma","Female",20,"5 days ago "],
    ["download (2).jfif","shahd","15A","Coma","Female",20,"5 days ago "],
    ["download (2).jfif","shahd","15A","Coma","Female",20,"5 days ago "],
    ["download (2).jfif","shahd","15A","Coma","Female",20,"5 days ago "],
    ["download (2).jfif","shahd","15A","Coma","Female",20,"5 days ago "],
    ["download (2).jfif","shahd","15A","Coma","Female",20,"5 days ago "],
    ["download (2).jfif","shahd","15A","Coma","Female",20,"5 days ago "],
    ["download (2).jfif","shahd","15A","Coma","Female",20,"5 days ago "],
    ["download (2).jfif","shahd","15A","Coma","Female",20,"5 days ago "],
    ["download (2).jfif","shahd","15A","Coma","Female",20,"5 days ago "],
    ["download (2).jfif","shahd","15A","Coma","Female",20,"5 days ago "],
    ["download (2).jfif","shahd","15A","Coma","Female",20,"5 days ago "],
    ["download (2).jfif","shahd","15A","Coma","Female",20,"5 days ago "],
    ["download (2).jfif","shahd","15A","Coma","Female",20,"5 days ago "],
    ["download (2).jfif","shahd","15A","Coma","Female",20,"5 days ago "],
    ["download (2).jfif","shahd","15A","Coma","Female",20,"5 days ago "],
    ["download (2).jfif","shahd","15A","Coma","Female",20,"5 days ago "],
    ["download (2).jfif","shahd","15A","Coma","Female",20,"5 days ago "],

   
   

];
  
 const role="Admin";
const label="Add";
 const flag=true;
 const columns=["Name","Bed_No","Statue","Gender","Age","Admitted"]

  return (
  
    <div className="container-fluid ">
      <div className="row ">
        <div className="col-10 col-md-4 ">
          <div className="patientanalysis-table">
            <Table_patients data={patient_Analysis_data} anotherProp={role} headers={columns} flag={flag} />
          </div>
        </div>
        {role === "Admin" && (
          <div className="col-10 text-end">
            <div className="addbtn">
              <Btn data={label} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PatientAnalysis;
