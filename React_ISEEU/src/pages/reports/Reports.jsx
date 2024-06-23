import React, { useEffect, useMemo, useState } from 'react';
import "./Reports.css";
import styles from './Reports.css';
import { Table_patients,Btn,ProSide } from '../../components';
import axios from 'axios'


const PatientAnalysis = () => {

  const initialPatientData = [
    ["Icons-Land-Medical-People-Patient-Female.ico","shahd","15A","Coma","Female",20,"5 days ago "],
    ["Icons-Land-Medical-People-Patient-Female.ico","Enjy","16A","Coma","Female",20,"5 days ago "],
    ["Icons-Land-Medical-People-Patient-Female.ico","shrouk","17A","Coma","Female",20,"5 days ago "],
    ["Icons-Land-Medical-People-Patient-Female.ico","meram","18A","Coma","Female",20,"5 days ago "],
    ["Icons-Land-Medical-People-Patient-Female.ico","nouran","19A","Coma","Female",20,"5 days ago "],
    ["Icons-Land-Medical-People-Patient-Female.ico","yasmeen","20A","Coma","Female",20,"5 days ago "],
    ["Icons-Land-Medical-People-Patient-Female.ico","bassant","21A","Coma","Female",20,"5 days ago "],
    ["Icons-Land-Medical-People-Patient-Female.ico","youmna","22A","Coma","Female",20,"5 days ago "],
    ["Icons-Land-Medical-People-Patient-Female.ico","alaa","23A","Coma","Female",20,"5 days ago "],
    ["Icons-Land-Medical-People-Patient-Female.ico","noor","24A","Coma","Female",20,"5 days ago "],
    ["Icons-Land-Medical-People-Patient-Female.ico","rahma","25A","Coma","Female",20,"5 days ago "],
    ["Icons-Land-Medical-People-Patient-Female.ico","awrad","26A","Coma","Female",20,"5 days ago "],
    ["Icons-Land-Medical-People-Patient-Female.ico","mariem","27A","Coma","Female",20,"5 days ago "],
    ["Icons-Land-Medical-People-Patient-Female.ico","reem","28A","Coma","Female",20,"5 days ago "],
    ["Icons-Land-Medical-People-Patient-Female.ico","aya","29A","Coma","Female",20,"5 days ago "],
    ["Icons-Land-Medical-People-Patient-Female.ico","mena","30A","Coma","Female",20,"5 days ago "],
    ["Icons-Land-Medical-People-Patient-Female.ico","fatma","31A","Coma","Female",20,"5 days ago "],
    ["Icons-Land-Medical-People-Patient-Female.ico","zeina","32A","Coma","Female",20,"5 days ago "],

  ];
  const [Reports, setReports] = useState(initialPatientData);  
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));
  const userID =  user.nid

  const role='Doctor';
  const label="Add";
  const flag= true;
  const columns=["Paient","Bed_No","Notes","Date(D-M)","Time","Report ID"]
  const handleDataChange = (newData) => {
  setReports(newData);
  };
  function formatDateTime(dateTimeString) {
    // Create a new Date object from the input string
  if(dateTimeString !== null){
    const date = new Date(dateTimeString);
  
    // Extract day and month
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() returns 0-based month
  
    // Extract hours and minutes
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
  
    // Format the date and time
    const formattedDate = `${day} - ${month}`;
    const formattedTime = `${hours} : ${minutes}`;
  
    return [formattedDate, formattedTime];}
  }
  
  // Example usage
  
  useEffect(() => {
    // Define an async function inside the useEffect
    const fetchData = async () => {
        // Perform the axios GET request
        console.log(userID)
        const body = {DID : userID}

        const responseReports = await axios.post('http://localhost:5000/doctor/doctor_reports', body,{
            headers: { 'Content-Type': 'application/json' }
          })
        console.log("reports", responseReports.data.doctor_reports)
        
        const rawReports = responseReports.data.doctor_reports
        const displayedReports = rawReports.map(encounter => [
          encounter[0], // Profile Picture of the patient
          `${encounter[1]} ${encounter[2]}`, // First name and last name
          encounter[3], // Bed No of the encounter
          encounter[5], // The status
          formatDateTime(encounter[10])[0], // Gender of the patient
          formatDateTime(encounter[10])[1], // Gender of the patient

        ]);


        console.log(displayedReports)  
        setReports(displayedReports)

      
      console.log("fetched ....")
      setLoading(false);

    }

    // Call the async function to fetch data
     fetchData();
    }, []);

    // if (loading) return <p>Loading...</p>;

  return (
  <div className='panalysis'>
    <div className="container-fluid ">
      <div className="row ">
      <div id={"SideBarAdmin"} className={"col-2"}>
                    <ProSide />
                </div>
        <div className="col-10 col-md-4 ">
          <div className="patientanalysis-table">
            <Table_patients data={Reports} anotherProp={role} headers={columns} flag={flag}  showSearch={true} onDataChange={handleDataChange} buttonpic={2}/>

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
