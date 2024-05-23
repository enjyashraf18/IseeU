import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./table.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState,useMemo } from 'react';
import { Table, Form, InputGroup, Button,Border } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
const Table_Patient = (props) => {
  //const  data  = props.data;
  const { data, headers,flag } = props
  console.log(data[0])
  console.log(Object.values(data[0])) /*it's an array*/
  let role= props.anotherProp||"user";
  console.log(role)
  //const flag=true;
  

  // Get the keys from the first object in the data array to generate the table headers 
  const columns = Object.keys(data[0]);
  // to undertsand what i will do 
  let row1=(data[0]);
  console.log(columns)
  console.log(row1)
  console.log(row1["id"])// as it was an two dimensional array
  console.log(data[0]["id"])// like ths in js will be in mapping each row in data and mapping each column in it 
// here is the search and filter 
const [searchTerm, setSearchTerm] = useState('');

const handleSearch = (event) => {
  setSearchTerm(event.target.value.toLowerCase());
};   // here the handle search make the search insensitve

const filteredData = data.filter((item) => // filter add this to the list of filtered data if there is match " return true"
  // item is the rows"objec" in the data {id:65,email:"ddnfj"} as the data is  list of object
  Object.values(item).some( // .values return the values of this object and .some iterate in each val in values
    (val) => {if (typeof val === "string") {
      return val.toLowerCase().includes(searchTerm);
    } else if (typeof val === "number") {
      return val.toString().includes(searchTerm);
    } //  this is boolen expression based on includes
} )
); //the filter data is the only the rows that match the serch term in the whole data

const[searchInput,setSearchInput]=useState(false)
function toggle_search(){
   if (searchInput){
  setSearchInput(false)
 }
 else{
  setSearchInput(true)
 }
}
// creating the table
  return (
    <div  className='tableComponent'>
      <div className="container-fluid">
      <FaSearch className="fasearch" onClick={toggle_search}/>
      {searchInput?(
    
      <div className='input'>
     {/* <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">
     
          </InputGroup.Text>
          <Form.Control 
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
      </InputGroup> */}
      <input  className='bar-input'
        type="text" 
        placeholder='Search...'
        onChange={handleSearch} 
        value={searchTerm}
      
      />
        </div>):null}

           
        <div className="table-responsive">
        <div rounded border>
          <Table className="table-rounded"   >
             <thead className="thead-fixed">
              <tr className='table-header'>
              {headers.map((header, index) => (
                    <th key={index}>{header}</th>
                  ))}
                {role==="Admin"?(<th className='lastchild'>Actions</th>):(null)}
              </tr>
            </thead>
            <tbody>

              
            

            {filteredData.map((row, rowIndex) => (
    <tr key={rowIndex}>
        {flag === true ? (
            <>
                <td key={`${rowIndex}`}>
                    <img src={row[0]} alt="Image" />{" "}
                    {row[1]}
                </td>
                {row.slice(2).map((val, index) => (
                    <td key={`${rowIndex}-${index}`}>
                        {val}
                    </td>
                ))}
            </>
        ) : (
            <>
                {row.map((val, index) => (
                    <td key={`${rowIndex}-${index}`}>
                        {val}
                    </td>
                ))}
            </>
        )}
        {role === "Admin" ? (
            <td className='lastchild'>
                <div className='role_action_component'>
                    <button className='editbtn'>Edit</button>
                    <button className='del'>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
            </td>
        ) : (null)}
    </tr>
))}

            </tbody>
          </Table>
            







        </div>
      </div>
    </div>
    </div>
  );
};

export default Table_Patient;
