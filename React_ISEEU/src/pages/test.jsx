import React, { useState, useEffect } from 'react';
import axios from 'axios'
function TestComponent() {
  
  const displayMedications =[]
  const displayedPatients =[]
  const meddata={}
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

            console.log(responseData)
            for(let i=0;i<rawmed.length; i++ ){
                const key = rawmed[i][9]
                meddata[key] = rawmed[i][30];
                 displayMedications.push(
                   [
                     `${rawmed[i][38]} (${rawmed[i]}gm)`,
                     rawmed[i][9],
                     `${rawmed[i][20]} ${rawmed[i][21]}`,
                     calcNextDose(rawmed[i][33], rawmed[i][35])
                   ]
                 )
              }

            console.log(displayMedications)


            for(let i=0;i<rawpat.length; i++ ){
              displayedPatients.push([
                rawpat[i][24], // Profile Picture of the patient
                `${rawpat[i][20]} ${rawpat[i][21]}`, // First name and last name
                rawpat[i][9], // Bed No of the encounter
                rawpat[i][3]
              ])
            }
            console.log(displayedPatients)

            for(let i=0;i<rawdoc.length; i++ ){
              displayedPatients.push([
                rawpat[i][24], // Profile Picture of the patient
                `${rawpat[i][20]} ${rawpat[i][21]}`, // First name and last name
                rawpat[i][9], // Bed No of the encounter
                rawpat[i][3]
              ])
            }

      

    
      }
    
        // Call the async function to fetch data
        fetchData();

    }
)


 // Empty array means this effect runs once when the component mounts

  return (
    <div>
 

    </div>
  );
}

export default TestComponent;
