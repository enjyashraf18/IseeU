import React, { useState, useEffect } from 'react';
import axios from 'axios'

function TestComponent() {
  

  const [doctors , setDoctors] = useState()
  const [error, setError] = useState(null);

  const [patients , setPatients] = useState()
  useEffect(() => {
    // Define an async function inside the useEffect
    const fetchPatients = async () => {
      try {
        // Perform the axios GET request
        const response = await axios.get('http://localhost:5000/doctor/current_encounters', {
          headers: {      
            'Content-Type': 'application/json'
          }
        });
        console.log(response.data);

        // Update the state with the fetched data
        setPatients(response.data.patients);
        console.log("fetched",patients)
            } catch (error) {
        // Update the state with the error
        setError(error);

    };
  }

    // Call the async function to fetch data
    fetchPatients();
}, []);
 // Empty array means this effect runs once when the component mounts

  return (
    <div>
      <h1>Posts:</h1>

    </div>
  );
}

export default TestComponent;
