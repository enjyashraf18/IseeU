import React from 'react';
import "./doctorView.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Table_patients} from '../../components';
import axios from 'axios'


const DoctorView = () => {
  
  
  

const flag_patient=true;

const data_patient_table=[
    ["download (2).jfif","shahd","15A","Coma","Female",20,"5 days ago","surgery"],
    ["download (2).jfif","shahd","15A","Coma","Female",20,"5 days ago ","surgery"],
    ["download (2).jfif","shahd","15A","Coma","Female",20,"5 days ago ","surgery"],

];
const data_doctor_Available=[
    ["download.jfif","DR. Otto Octavius","morning shift"],
    ["download.jfif","DR. Otto Octavius","morning shift"],
    ["download.jfif","DR. Otto Octavius","morning shift"],
    ["download.jfif","DR. Otto Octavius","morning shift"],
    ["download.jfif","DR. Otto Octavius","morning shift"],
]
const data_doctor_unAvailable=[
    ["download.jfif","DR. Otto Octavius","morning shift"],
    ["download.jfif","DR. Otto Octavius","morning shift"],
    ["download.jfif","DR. Otto Octavius","morning shift"],
    ["download.jfif","DR. Otto Octavius","morning shift"],
    ["download.jfif","DR. Otto Octavius","morning shift"],
    ]

    const initialDataCheckups=[
      ["download (2).jfif","Enjy Ashraf","15A","checked"],
      ["download (3).jfif","Talal emara","16A","unchecked"],
      ["download (2).jfif","Enjy Ashraf","15A","checked"],
      ["download (3).jfif","Talal emara","16A","unchecked"],
      ["download (2).jfif","Enjy Ashraf","15A","checked"],
      ["download (3).jfif","Talal emara","16A","unchecked"],
      ["download (2).jfif","Enjy Ashraf","15A","checked"],
      ["download (3).jfif","Talal emara","16A","unchecked"],
    ]


/**
 * Here we want all the patients of the department from the encounter 
 * Doctors Data needed
 */

const flag_Doctors=true;
const column__doctor_av=["Available"," "];
const column_doctor_un=["unAvailable"," "];
const columns_patient=["Name","Bed_No","Statue","Gender","Age","Admitted","Refell Department"];
const columns_checkups=[" ","Name","Bed_No"," "];
const role="user";

  const [dataCheckups, setDataCheckups] = useState(initialDataCheckups);

  const handleDataChange = (newData) => { // here i change the data of the patient if checked or not " toggle first value"
    setDataCheckups(newData);
  };


const num=data_patient_table.length;
const DoctorView = () => {


  return (
    <div className='DoctorView'>
  <div className='container-fluid'>
    <div className='row'>
      <div className='col-10 offset-1'>
        <h2 className='col-3 offset-2'>Patients</h2>
        <div className='Number'>
        <h12 className="col- offset-3">{data_patient_table.length}</h12>
        </div>
        <div className='Doctor_table_patients'>
          <Table_patients data={data_patient_table} anotherProp={role} headers={columns_patient} flag={flag_patient}  showSearch={true}/>
        </div>
        <div id="flex_rotation" className='row'>
          <h2 className='col-3 offset-2'>Checkups</h2>

          <h2 id='staff-h2' className='col-3 offset-2'>Staff</h2>
        </div>
        <div className='row'>
          <div className='col-4 offset-2'>
            <div className='Doctor_table_checkups'>
            <Table_patients
                data={dataCheckups}
                headers={columns_checkups}
                flag={flag_patient}
                anotherProp={role}
                onDataChange={handleDataChange}
                ischecktable={true}
                showSearch={true}
                idx_checked ={3}
              />

            </div>
          </div>
          <div className='col-4 offset-1'>
            <div className='Doctor_table_staff'>
                <div className='available_doctors'>
             <Table_patients data={data_doctor_Available} anotherProp={role} headers={column__doctor_av} flag={flag_Doctors}  showSearch={true}/>
             </div>
             <div className='unavailable_doctors'>
             <Table_patients data={data_doctor_unAvailable} anotherProp={role} headers={column_doctor_un} flag={flag_Doctors}  showSearch={true}/>

             </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default DoctorView
