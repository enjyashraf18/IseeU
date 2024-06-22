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
  const [bedsData, setBedsData ]= useState([20, 15]); // Assuming 55 beds available, 22 taken
  const [patientsNumber, setPatientsNum] = useState(20);
  const [staff , setStaff] = useState([], [])

  useEffect(() => {
    const fetchData = async () => {
        // const [responseEncounters, responseStaff] = await Promise.all([
        //     axios.get('http://localhost:5000/doctor/current_encounters', {
        //         headers: { 'Content-Type': 'application/json' }
        //     }),
        //     axios.get('http://localhost:5000/doctor/current_employees', {
        //         headers: { 'Content-Type': 'application/json' }
        //     })
        // ]);
        const responseEncounters = await axios.get('http://localhost:5000/doctor/current_encounters', {
          headers: { 'Content-Type': 'application/json' }
        });

        const encounters = responseEncounters.data.active_encounters
        console.log(encounters)
        setPatientsNum(encounters.length)
        setBedsData([20, encounters.length])
        console.log(patientsNumber)
        console.log(bedsData)

        const responseStaff = await axios.get('http://localhost:5000/doctor/current_employees', {
          headers: { 'Content-Type': 'application/json' }
        });


        const employeeData = responseStaff.data.active_employees
        const employeesData = employeeData.map(employee => [
            employee[7], // ProfilePic
            `${employee[3]} ${employee[4]}`, // FullName
            employee[14], // Shift
            employee[11],  // Role
            calculateAge(employee[8])
        ]);
        setStaff(employeeData)
        console.log(employeesData)

          
    }
    fetchData()

},[])


 // Empty array means this effect runs once when the component mounts

  return (
    <div>
 

    </div>
  );
}

export default TestComponent;
