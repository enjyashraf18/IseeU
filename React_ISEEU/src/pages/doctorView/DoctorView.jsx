import "./doctorView.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import {Table_patients} from '../../components';
import axios from 'axios'


const DoctorView = () => {
 

  
  

const flag_patient=true;

const data_patient_table=[
    ["Icons-Land-Medical-People-Patient-Female.ico","shahd","15A","Coma","Female",20,"5 days ago","surgery"],
    ["Icons-Land-Medical-People-Patient-Female.ico","shahd","15A","Coma","Female",20,"5 days ago ","surgery"],
    ["Icons-Land-Medical-People-Patient-Female.ico","shahd","15A","Coma","Female",20,"5 days ago ","surgery"],
    ["download_(4).jfif","Mohamed","15A","Coma","male",20,"5 days ago ","surgery"],

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
      ["Icons-Land-Medical-People-Patient-Female.ico","Enjy Ashraf","15A","checked"],
      ["download.png","Talal emara","16A","unchecked"],
      ["Icons-Land-Medical-People-Patient-Female.ico","Enjy Ashraf","15A","checked"],
      ["download.png","Talal emara","16A","unchecked"],
      ["Icons-Land-Medical-People-Patient-Female.ico","Enjy Ashraf","15A","checked"],
      ["download.png","Talal emara","16A","unchecked"],
      ["Icons-Land-Medical-People-Patient-Female.ico","Enjy Ashraf","15A","checked"],
      ["download.png","Talal emara","16A","unchecked"],
    ]


/**
 * Here we want all the patients of the department from the encounter 
 * Doctors Data needed
 */
/**
 * Employees dict shape :(  NID VARCHAR(15) UNIQUE, EmployeeID SERIAL UNIQUE PRIMARY KEY, UserName VARCHAR(20) NOT NULL , Password VARCHAR(20) NOT NULL ,
    FirstName VARCHAR(20) NOT NULL, LastName VARCHAR(20), Gender VARCHAR(20) NOT NULL, EmailAddress VARCHAR(100) NOT NULL,
    ProfilePic VARCHAR(100), DateOfBirth DATE, PhoneNumber VARCHAR(20), Address VARCHAR(200), Role ROLE NOT NULL, DateHired DATE,
    DateLeft DATE, shift   VARCHAR(20),)
 * 
 */

const flag_Doctors=true;
const column__doctor_av=["Available"," "];
const column_doctor_un=["unAvailable"," "];
const columns_patient=["Name","Bed_No","Statue","Gender","Age","Admitted","Refell Department"];
const columns_checkups=[" ","Name","Bed_No"," "];
const role="user";

  const [dataCheckups, setDataCheckups] = useState(initialDataCheckups);
  const [error, setError] = useState(null);
  const [staff , setStaff] = useState()

  useEffect(() => {
    // Define an async function inside the useEffect
    const fetchstaff = async () => {
        // Perform the axios GET request
        const response = await axios.get('http://localhost:5000/doctor/current_employees', {
          headers: {      
            'Content-Type': 'application/json'
          }
        });
        console.log("starttttttt",response.data);


        // Update the state with the fetched data
        const employee = response.data.current_employees.map(employee => ({
          ProfilePic: employee[8],
          NID: employee[1],
          EmployeeID: employee[0],
          UserName: employee[2],
          Password: employee[3],
          FirstName: employee[4],
          LastName: employee[5],
          Gender: employee[6],
          EmailAddress: employee[7],
          DateOfBirth: employee[9],
          PhoneNumber: employee[10],
          Address: employee[11],
          Role: employee[12],
          DateHired: employee[13],
          DateLeft: employee[14],
          Shift: employee[15]
        }))


           
        // Update the state with the error
        setDoctors( employees)

        console.log("fetched ....", staff)

        // console.log("keys",Object.keys(doctors))

  }
    const fetchEncounters = async() => {
      
    }
    // Call the async function to fetch data
    fetchstaff();
  }, []);

  const handleDataChange = (newData) => { // here i change the data of the patient if checked or not " toggle first value"
    setDataCheckups(newData);
  };


const num=data_patient_table.length;


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
             <Table_patients data={data_doctor_unAvailable} anotherProp={role} headers={column_doctor_un} flag={flag_Doctors}  showSearch={false}/>

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
