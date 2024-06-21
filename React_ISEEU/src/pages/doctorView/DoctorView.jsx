import "./doctorView.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import {Table_patients} from '../../components';
import axios from 'axios'



const DoctorView = () => {
  function currentShift() {
    const currentHour = new Date().getHours();
    // Assuming day shift is from 6 AM to 6 PM
    
    if (currentHour >= 6 && currentHour < 18) {
      return "Day";
    } else {
      return "Night";
    }
  }

  function calculateAge(dateOfBirth) {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  function calculateDays(date) {
    const thedate = new Date(date);
    const today = new Date();
    const timeDifference = today - thedate;
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
    return days;
  }

  function calculateHours(date) {
    const thedate = new Date(date);
    const today = new Date();
    const timeDifference = today - thedate;
    
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // Remaining hours
    
    return  hours ;
  }
  
  
  

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

    let urls = [
      "http://localhost:5000/doctor/current_employees",
      "http://localhost:5000/doctor/current_e",
    ];


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
  const [encounters, setEncounters] = useState(data_patient_table);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [staff , setStaff] = useState(data_doctor_unAvailable, data_doctor_Available)

  useEffect(() => {
    // Define an async function inside the useEffect
    const fetchData = async () => {
        // Perform the axios GET request
        const [responseEncounters, responseStaff] = await Promise.all([
          axios.get('http://localhost:5000/doctor/current_encounters', {
            headers: { 'Content-Type': 'application/json' }
          }),
          axios.get('http://localhost:5000/doctor/current_employees', {
            headers: { 'Content-Type': 'application/json' }
          })
        ]);
        console.log("encounters", responseEncounters.data.active_encounters)
        console.log("staff", responseStaff.data['active_employees'] )
        const employeeData = responseStaff.data['active_employees']
        const encounters = responseEncounters.data.active_encounters
        const checkupInitial = responseEncounters.data.active_encounters
        const encountersData = encounters.map(encounter => [
          encounter[24], // Profile Picture of the patient
          `${encounter[20]} ${encounter[21]}`, // First name and last name
          encounter[9], // Bed No of the encounter
          encounter[3], // The status
          encounter[22], // Gender of the patient
          calculateAge(encounter[25]), // Age
          calculateDays(encounter[7]), // Days since encounter
          encounter[13] // Departments
        ]);

        const checkupsData = checkupInitial.map(checkup =>[
          checkup[24], // Profile Picture of the patient
          `${checkup[20]} ${checkup[21]}`, // First name and last name
          checkup[9], // Bed No of the encounter
          calculateHours(checkup[14])

        ])

        console.log('check up data',checkupsData)
        console.log(encountersData)  
        setDataCheckups(checkupsData)
        setEncounters(encountersData)

        console.log("fetched emnployees ....",employeeData)
 
              // Process staff
      const employeesData = employeeData.map(employee => [
        employee[8], // ProfilePic
        `${employee[4]} ${employee[5]}`, // FullName
        employee[15], // Shift
        employee[12]  // Role
      ]);

      const employeesAvailable = [];
      const employeesUnavailable = [];

      for (let i = 0; i < employeesData.length; i++) {
        if (employeesData[i][2] === currentShift()) {
          employeesAvailable.push(employeesData[i]);
        } else {
          employeesUnavailable.push(employeesData[i]);
        }

      }

      setStaff([employeesUnavailable, employeesAvailable]);
      // console.log(currentShift())
      console.log("fetched ....", staff)
      setLoading(false);

  }

    // Call the async function to fetch data
    fetchData();
  }, []);

  const handleDataChange = (newData) => { // here i change the data of the patient if checked or not " toggle first value"
    setDataCheckups(newData);
  };




const num=data_patient_table.length;
if (loading) return <p>Loading...</p>;


return (
  <div className='DoctorView container-fluid'>
    <div className='row'>
      <div className='col-3'>
        <div className='doc_sidebar'>
          <ProSide />
        </div>
      </div>

      <div className='col-8'>
<div>
          <h2>Patients</h2>
          <div className='Number'>
            <h12>{data_patient_table.length}</h12>
          </div>
          <div className='Doctor_table_patients'>
            <Table_patients data={data_patient_table} anotherProp={role} headers={columns_patient} flag={flag_patient} showSearch={true} buttonpic={2} />
          </div>
        </div>

        <div className='flow_row_nurse'>
          <div className='row'>
            <div className='col-6'>
              <h2>Checkups</h2>
              <div className='Doctor_table_checkups'>
                <Table_patients
                  data={dataCheckups}
                  headers={columns_checkups}
                  flag={flag_patient}
                  anotherProp={role}
                  onDataChange={() => {}}
                  ischecktable={true}
                  showSearch={true}
                  idx_checked={3}
                  check_rep={2}
                  buttonpic={2}
                />
              </div>
            </div>

            <div className='col-6'>
              <div className='doc_staff'>
              <h2>Staff</h2>
              <div className='Doctor_table_staff'>
                <div className='available_doctors'>
                  <Table_patients data={data_doctor_Available} anotherProp={role} headers={column__doctor_av} flag={flag_Doctors} showSearch={true} />
                </div>
                <div className='unavailable_doctors'>
                  <Table_patients data={data_doctor_unAvailable} anotherProp={role} headers={column_doctor_un} flag={flag_Doctors} showSearch={false} />
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
</div>
);
};

export default DoctorView;