import React, { useState, useEffect } from 'react';
import axios from 'axios'

function TestComponent() {
  

  const [doctors , setDoctors] = useState()


  useEffect( () => {

    const body = {
      NID : 'D001',
      username : 'johnsmith',
      password : 'pass1234'
    }

    console.log('start ',body);

    axios.post('http://localhost:5000/doctor', body, {
      headers: {      
        'Content-Type': 'application/json'
      }
    })

    .then(
      response => {
        console.log(response.data);
        setDoctors(response.data);
        console.log(doctors);
      }
    )

    .catch(error => {
      console.log(error)
    }, [])


  }

  ); // Empty array means this effect runs once when the component mounts

  return (
    <div>
      <h1>Posts:</h1>

    </div>
  );
}

export default TestComponent;
