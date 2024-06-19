import React, { useState } from 'react';
import "./patientAnalysis.css";
import styles from './patientAnalysis.css';
import { Table_patients,Btn } from '../../components';
const PatientAnalysis = () => {

  const initialPatientData = [
    ["Icons-Land-Medical-People-Patient-Female.ico","shahd","15A","Coma","Female",20,"5 days ago "],
    ["Icons-Land-Medical-People-Patient-Female.ico","Enjy","15A","Coma","Female",20,"5 days ago "],
    ["Icons-Land-Medical-People-Patient-Female.ico","shrouk","15A","Coma","Female",20,"5 days ago "],
    ["Icons-Land-Medical-People-Patient-Female.ico","meram","15A","Coma","Female",20,"5 days ago "],
    ["Icons-Land-Medical-People-Patient-Female.ico","nouran","15A","Coma","Female",20,"5 days ago "],
    ["Icons-Land-Medical-People-Patient-Female.ico","yasmeen","15A","Coma","Female",20,"5 days ago "],
    ["Icons-Land-Medical-People-Patient-Female.ico","bassant","15A","Coma","Female",20,"5 days ago "],
    ["Icons-Land-Medical-People-Patient-Female.ico","youmna","15A","Coma","Female",20,"5 days ago "],
    ["Icons-Land-Medical-People-Patient-Female.ico","alaa","15A","Coma","Female",20,"5 days ago "],
    ["Icons-Land-Medical-People-Patient-Female.ico","noor","15A","Coma","Female",20,"5 days ago "],
    ["Icons-Land-Medical-People-Patient-Female.ico","rahma","15A","Coma","Female",20,"5 days ago "],
    ["Icons-Land-Medical-People-Patient-Female.ico","awrad","15A","Coma","Female",20,"5 days ago "],
    ["Icons-Land-Medical-People-Patient-Female.ico","mariem","15A","Coma","Female",20,"5 days ago "],
    ["Icons-Land-Medical-People-Patient-Female.ico","reem","15A","Coma","Female",20,"5 days ago "],
    ["Icons-Land-Medical-People-Patient-Female.ico","aya","15A","Coma","Female",20,"5 days ago "],
    ["Icons-Land-Medical-People-Patient-Female.ico","mena","15A","Coma","Female",20,"5 days ago "],
    ["Icons-Land-Medical-People-Patient-Female.ico","fatma","15A","Coma","Female",20,"5 days ago "],
    ["Icons-Land-Medical-People-Patient-Female.ico","zeina","15A","Coma","Female",20,"5 days ago "],

   
   

];
const [patientAnalysisData, setPatientAnalysisData] = useState(initialPatientData);  
 const role="Admin";
const label="Add";
 const flag=true;
 const columns=["Name","Bed_No","Statue","Gender","Age","Admitted"]
 const handleDataChange = (newData) => {
  setPatientAnalysisData(newData);
};

  return (
  <div className='panalysis'>
    <div className="container-fluid ">
      <div className="row ">
        <div className="col-10 col-md-4 ">
          <div className="patientanalysis-table">
            <Table_patients data={patientAnalysisData} anotherProp={role} headers={columns} flag={flag}  showSearch={true} onDataChange={handleDataChange} />

          </div>
        </div>
        {role === "Admin" && (
          <div className="col-10 text-end">
            <div className="addbtn">
              <Btn label={label} />
        
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}

export default PatientAnalysis;
