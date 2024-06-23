import React, { useState, useMemo,useEffect } from 'react';
import "./nurseProfile.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table_patients,Btn,Card,ProSide } from '../../components';
import axios from 'axios'
const NurseProfile = () => {

    const nurseId = 'N001'// will get it from useContext

    const intialMedication=[["Devil Breath (500mg)","15A","Miguel O’Hara","Now","unchecked"],["Devil Breath (500mg)","15A","Miguel O’Hara","Now","unchecked"],
    ["Devil Breath (500mg)","15A","Miguel O’Hara","22:11 am","unchecked"],["Devil Breath (500mg)","15A","Miguel O’Hara","22:11 am","unchecked"]]
    const displayMedications=[]

    const displayedPatients = []
    const patient_nurse=[["Icons-Land-Medical-People-Patient-Female.ico","shahd","15A","Coma"],
    ["Icons-Land-Medical-People-Patient-Female.ico","Enjy","15A","Coma"],
    ["Icons-Land-Medical-People-Patient-Female.ico","shrouk","15A","Coma"],
    ["Icons-Land-Medical-People-Patient-Female.ico","meram","15A","Coma"],
    ["Icons-Land-Medical-People-Patient-Female.ico","nouran","15A","Coma"],
    ["Icons-Land-Medical-People-Patient-Female.ico","yasmeen","15A","Coma"]];
    const nurse_staff=[["Miguel", "O'Hara", "22", "Male"],["Miguel", "O'Hara", "22", "Male"],["Miguel", "O'Hara", "22", "Male"]]
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
    const meddata = []
    const [medication,setmedication]= useState();
    const [loading, setLoading] = useState(true);
    const [encounters, setEncounters] = useState();
    const [doctors , setdoctors] = useState(data_doctor_unAvailable, data_doctor_Available)


    const medication_header=["","Medication","Bed No.","Patient","Time"];
    const patient_header=["Name","Bed_No","Statue"]
    const role="user";
    const handleMedicationChange = (newData) => { // here i change the data of the patient if checked or not " toggle first value"
    setmedication(newData);

  };


    const flag_Doctors =true;
const column__doctor_av=["Available"," "];
const column_doctor_un=["unAvailable"," "];
function calcNextDose(lastDoseTime, freqPerDay) {
  // Parse the lastDoseTime to a Date object
  const lastDoseDate = new Date(lastDoseTime);

  // Transform freqPerDay to number of hours
  const hoursBetweenDoses = 24 / freqPerDay;

  // Calculate the next dose time
  const nextDoseDate = new Date(lastDoseDate.getTime() + hoursBetweenDoses * 60 * 60 * 1000);

  // Get the current time
  const now = new Date();

  // Compare the next dose time with the current time
  if (now >= nextDoseDate) {
    return 'now';
  } else {
    // Format the nextDoseDate as HH:MM
    const hours = String(nextDoseDate.getHours()).padStart(2, '0');
    const minutes = String(nextDoseDate.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }
}
function currentShift() {
  const currentHour = new Date().getHours();
  // Assuming day shift is from 6 AM to 6 PM
  
  if (currentHour >= 6 && currentHour < 18) {
    return "Day";
  } else {
    return "Night";
  }
}
useEffect(  
  ()=>{
      const fetchData = async () => {
          const body = {
              NID: 'N001'
          }
          // Perform the axios GET request
          const response = await axios.post('http://localhost:5000//NurseProfile', body,{
                  headers: { 'Content-Type': 'application/json' }
                })                  
             

          const responseData = response.data
          const rawdoc = response.data.nurse_data.doctors
          const rawpat = response.data.nurse_data.patients
          const rawmed = response.data.nurse_data.medications
          const displayMedications = []      
          console.log(responseData)
          for(let i=0;i<rawmed.length; i++ ){
              const key = rawmed[i][9]
              meddata[key] = rawmed[i][30];
               displayMedications.push(
                 [
                   `${rawmed[i][38]} (${rawmed[i][35]}gm)`,
                   rawmed[i][9],
                   `${rawmed[i][20]} ${rawmed[i][21]}`,
                   calcNextDose(rawmed[i][33], rawmed[i][35]),
                   'unchecked'
                 ]
               )
            }

          console.log(displayMedications)
          setmedication(displayMedications)

          for(let i=0;i<rawpat.length; i++ ){
            displayedPatients.push([
              rawpat[i][24], // Profile Picture of the patient
              `${rawpat[i][20]} ${rawpat[i][21]}`, // First name and last name
              rawpat[i][9], // Bed No of the encounter
              rawpat[i][3]
            ])
          }
          console.log(displayedPatients)
          setEncounters(displayedPatients)
          for(let i=0;i<rawdoc.length; i++ ){
            displayedPatients.push([
              rawpat[i][24], // Profile Picture of the patient
              `${rawpat[i][20]} ${rawpat[i][21]}`, // First name and last name
              rawpat[i][9], // Bed No of the encounter
              rawpat[i][3]
            ])
          }
                  // Process staff
    const doc = rawdoc.map(employee => [
      employee[7], // ProfilePic
      `DR ${employee[3]} ${employee[4]}`, // FullName
      employee[14], // Shift
    ]);

    const docAvailable = [];
    const docUnavailable = [];

    for (let i = 0; i < doc.length; i++) {
      if (doc[i][2] === currentShift()) {
        docAvailable.push(doc[i]);
      } else {
        docUnavailable.push(doc[i]);
      }

    }

    // console.log(currentShift())
    console.log(docAvailable)
    console.log(docUnavailable)
    setdoctors([docAvailable, docUnavailable])

    setLoading(false)

  
    }
  
      // Call the async function to fetch data
    fetchData();

  },[])


if (loading) return <p>Loading...</p>;

  
return (


  <div className='nurseprofile container-fluid'>
    <div className='row'>
      <div className='col-2'>{/* Sidebar */}
        <div className='sidebar_nurse'>
      <ProSide data={"nurse"}/>
      </div>
      </div>
      
      <div className='col-9'>
      <h2>Medication</h2>
        <div className="medication_nurse">
        
          <Table_patients
            data={medication}
            headers={medication_header}
            flag={false}
            anotherProp={role}
            onDataChange={handleMedicationChange}
            ischecktable={true}
            showSearch={false}
            idx_checked={4}
          />
        </div>
        <div className='row' style={{height:"0px"}}></div> 
        <div className='flow_row_nurse'>
          <div className='row'>
            <div className='col-7'>
            <h2>Patient</h2>
              <div className='patient_nurse'>
          
                <div className='Number'>
                  <span>{encounters.length}</span>
                </div>
                <Table_patients
                  data={encounters}
                  headers={patient_header}
                  flag={true}
                  anotherProp={role}
                  ischecktable={false}
                  showSearch={true}
                  buttonpic={2}
                />
              </div>
            </div>
            <div className='col-5'>
              <div className='staff_nurse'></div>
            <h2>Staff</h2>
              <div className='nurse_staff'>
                <div className='Doctor_table_staff'>
             
                  <div className='available_doctors'>
                    <Table_patients
                      data={doctors[0]}
                      anotherProp={role}
                      headers={column__doctor_av}
                      flag={flag_Doctors}
                      showSearch={true}
                    />
                  </div>
                  <div className='unavailable_doctors'>
                    <Table_patients
                      data={doctors[1]}
                      anotherProp={role}
                      headers={column_doctor_un}
                      flag={flag_Doctors}
                      showSearch={false}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div> {/* End of nested row */}
        </div> {/* End of flow_row_nurse */}
      </div> {/* End of col-8 */}
    </div> {/* End of main row */}
    <div className='row' style={{height:"400px"}}></div>  {/**this solve the problem of background color */}
          </div>
);
}

export default NurseProfile;