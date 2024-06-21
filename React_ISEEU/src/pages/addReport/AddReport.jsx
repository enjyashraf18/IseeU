import React, { useState } from 'react';
import "./addReport.css";
import { CCloseButton } from '@coreui/react';
import { Table_patients,Btn} from '../../components';
import { FaPlus } from 'react-icons/fa'; /**for adding "add" to the medication */
import { TbTriangleInvertedFilled } from "react-icons/tb"; 
import axios from 'axios'

/**for the choices in the medication modal */
const AddReport = (prop) => {
   
  const initialMedication=[["Devil Breath (500gm)","5  /day","5 weeks"],] /**here i take the intial medication from database */
  const medication_header=["    ","  "," "," "]
  const initialtestsCheckups1=[["cbc","checked"],["db","unchecked"],["cbcc","checked"]]; /**take  the tests from database */
  const columns_tests_checkups1=["A"," "];
  const initialscansCheckups=[["Chest","checked"],["Brain MRI","unchecked"],["X-Ray","checked"]]; /**take the scans from database */
  const columns_scans_checkups=["B"," "];
  const options = ['day', 'week', 'month'];
  const options_duartion = ['days', 'weeks', 'months'];

  const bedNo=prop.data; /**you should bring from this all the infromation needed to be showed  */
  const closeModal=prop.closeModal;
  const submitModal = prop.submitModal;
  const role="user";
  const flag=false;
  const docID= 72; // will use Context to get it

  console.log(bedNo);

 /**intillay the report modal is true as you click on the button and call it*/
  const [childModal,setchildModal]=useState(false)



  const [medication,setmedication]=useState(initialMedication)
  const [testsCheckups1, settestsCheckups1] = useState(initialtestsCheckups1);
  const [scansCheckups, setscansCheckups] = useState(initialscansCheckups);
  const [medicationName, setMedicationName] = useState(''); /**this for define the info from sumbit to be added to the table */
  const [frequencyNum, setFrequencyNum] = useState('');
  const [dosage, setDosage] = useState('');
  const [durationNum, setDurationNum] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0); /**for the choices in the medication modal */
  const [currentIndexDur, setCurrentIndexDur] = useState(0); /**for the choices in the medication modal */
  const [notes, setNotes] = useState('');


   // Function to filter checked items to make it appear in the orderd scans/tests
  const getCheckedItems = (checkups) => {
    return checkups
      .filter(item => item[1] === 'checked') // Filter only checked items
      .map(item => item[0]); // Extract the item name

  };
  
  const handletestChange = (newData) => { // here i change the data of the patient if checked or not " toggle first value"
    settestsCheckups1(newData);
    console.log('tests:',testsCheckups1 )

  };
  const handlescanChange = (newData) => { // here i change the data of the patient if checked or not " toggle first value"
    setscansCheckups(newData);
    console.log('scans:',scansCheckups)

  };
  const handleMedicationChange=(newData) => { // here i change the data of the patient if checked or not " toggle first value"
    setmedication(newData);
  };

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };
  const toggleChildModal=()=>{ /**here is function for medication add modal  toggle when press on the faplus */
    setchildModal(!childModal);
  }

  function getDate() { /**function to get the time and date */
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: "Africa/Cairo" // Set the time zone to Egypt (Africa/Cairo)
    };
  
    const formatter = new Intl.DateTimeFormat("en-US", options);
    const now = new Date(); // Get the current date and time dynamically
    const formattedTime = formatter.format(now);
  
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const date = now.getDate();
  
    return `${formattedTime} ${date}/${month}/${year}`;

  }
  const handleNext = () => { /**fot the choices of the medication modal */
    setCurrentIndex((prevIndex) => (prevIndex + 1) % options.length); /** "% "to ensure you go in cycle */
  };
  const handleNext_duration = () => { /**fot the choices of the medication modal */
    setCurrentIndexDur((prevIndex) => (prevIndex + 1) %options_duartion.length); /** "% "to ensure you go in cycle */
  };
  const handleMedicationSubmit = () => { /**for updating the table from the medication added */
    const newMedication = [
      `${medicationName} (${dosage}mg)`,
      `${frequencyNum}  /${options[currentIndex]}`,
      `${durationNum} ${options_duartion[currentIndexDur]}`,`unchecked`
    ];
    setmedication([...medication, newMedication]);

    console.log('medications:',medication)

    toggleChildModal();
  };
  const handle_parent_modal_submit=()=>{
    console.log("save first the data in the database")
     closeModal()
     submitModal();
  }
  const allCheckedItems = [
    ...getCheckedItems(testsCheckups1),
    ...getCheckedItems(scansCheckups)
  ];
const handle_parent_modal_close=()=>{
  closeModal()
}
  const reportData = {
    bedid: prop.data,
    medications:medication,
    investigations: [
      ...getCheckedItems(testsCheckups1),
      ...getCheckedItems(scansCheckups)
    ],

    report:{
    notes: notes,
    reportdoc: docID
    },
    currentTime: getDate()

  }
      // Get all checked items from both checkups tables (scans ,tests)
  

    function splitNameDose(productString) {
      const splitIndex = productString.indexOf('(');
      if (splitIndex === -1) {
        throw new Error('Invalid product string format');
      }
    
      const name = productString.slice(0, splitIndex).trim();
      const dosageWithUnit = productString.slice(splitIndex + 1, productString.length - 1).trim();
    
      // Extract only the number from the dosage
      const dosage = dosageWithUnit.replace('gm', '').trim();
    
      return { name, dosage };
    }

 
    function calculateTotalDoses(frequency, duration) {

      function parseFrequency(frequencyString) {
        const [doses, unit] = frequencyString.split(' /');
        return { doses: parseInt(doses, 10), unit };
      }
      
      function parseDuration(durationString) {
        const [duration, unit] = durationString.split(' ');
        return { duration: parseInt(duration, 10), unit };
      }
      
      const { doses, unit: freqUnit } = parseFrequency(frequency);
      const { duration: durationValue, unit: durUnit } = parseDuration(duration);
    
      let daysInDuration;
    
      // Calculate total duration in days
      if (durUnit === 'day' || durUnit === 'days') {
        daysInDuration = durationValue;
      } else if (durUnit === 'week' || durUnit === 'weeks') {
        daysInDuration = durationValue * 7;
      } else if (durUnit === 'month' || durUnit === 'months') {
        daysInDuration = durationValue * 30; // Approximate month as 30 days
      } else {
        throw new Error('Invalid duration unit');
      }
    
      // Calculate doses per day
      let dosesPerDay;
      if (freqUnit === 'day' || freqUnit === 'days') {
        dosesPerDay = doses;
      } else if (freqUnit === 'week' || freqUnit === 'weeks') {
        dosesPerDay = doses / 7;
      } else if (freqUnit === 'month' || freqUnit === 'months') {
        dosesPerDay = doses / 30; // Approximate month as 30 days
      } else {
        throw new Error('Invalid frequency unit');
      }
    
      // Total doses is doses per day multiplied by the total number of days in the duration
      const totalDoses = dosesPerDay * daysInDuration;
      return totalDoses;
    }
    
    function transformFrequency(frequencyString) {
      const [doses, unit] = frequencyString.split(' /');
      const dosesNum = parseInt(doses, 10);
    
      if (isNaN(dosesNum)) {
        throw new Error('Invalid dose number');
      }
    
      let dosesPerDay;
    
      switch (unit.trim().toLowerCase()) {
        case 'day':
        case 'days':
          dosesPerDay = dosesNum;
          break;
        case 'week':
        case 'weeks':
          dosesPerDay = dosesNum / 7;
          break;
        case 'month':
        case 'months':
          dosesPerDay = dosesNum / 30; // Using 30 as an approximate number of days in a month
          break;
        default:
          throw new Error('Invalid frequency unit');
      }
    
      return dosesPerDay;
    }
    
    function transformMedications (medication) {
      const newMed = []
      for(let i = 0; i < medication.length; i++ ){
        newMed.push({
          name: splitNameDose(medication[i][0]).name,
          dosage:splitNameDose(medication[i][0]).dosage,
          dosecount:calculateTotalDoses(medication[i][1],medication[i][2]),
          assigndatetime: getDate(),
          frequencyperday: transformFrequency(medication[i][1])
        })

      }
      return newMed
    }
    function transformInvestigations (allCheckedItems) {
      const investigations = []
      for (let i =0 ;  i<allCheckedItems.length; i ++){
        investigations.push(
          {
            invname: allCheckedItems[i],
            invdatetiem: getDate(),
            orderedby: docID
          }
        )

      }
    return investigations
    }
  const handlesubmit = () =>{

    console.log('report data', reportData)
    const body = {
      bedid : reportData.bedid,
      medications: transformMedications(reportData.medications),
      investigations: transformInvestigations(reportData.investigations),
      report:{
        notes:reportData.notes,
        reportdoc:docID
      },
      currentTime: reportData.currentTime
    }
    axios.post('http://localhost:5000/login', body, {
      headers: {      
        'Content-Type': 'application/json'
      }
    })

    .then(response => {
      console.log(response.data);

      // setServerResponse(response.data.message);
      // setShow(true);
    })
    
    .catch(error => {
      console.log(error);
    });


    console.log(body)
  }



  return (
    <div className='add_report_content'>
   
      <div>
      <div className='container-fluid'>
      <dialog className="dialog-modal" open={true} >
        <div className='row'>
        <div className='dialog_header'>
        <h1>Add Report</h1> 
        <h3>{getDate()}</h3>
        </div>
        </div>
     <div className='header-content-report'>
        <div className='row' id="felx-row">
        <h3 className='col-7'>Report</h3>
        <h3 className='col-2'>Medication</h3>
        <button className='faplus col-1'  onClick={toggleChildModal}><FaPlus className='icon'/></button>
        </div>
        </div>
       
        <div className='row' id='flex-row'>
       
            <div className='report col-6'>
         
         
                <textarea
                  value={notes}
                  onChange={handleNotesChange}>

                </textarea> {/**text area for multi line text as the input support only one line */}
                </div>
             
                <div className='col-1'></div> {/**i make space between them */}
        <div className='medication col-5 p-0 m-0 '>
        
 
        <Table_patients 
         data={medication}
         headers={medication_header}
         flag={flag}
         anotherProp={role}
         onDataChange={handleMedicationChange}
         ischecktable={false}
         showSearch={false}
         idx_checked ={3}
        />


                </div>
                </div>
                <div className='header-content-tests'>
                <div className='row'>
                <h3 className='col-3'>Tests</h3>
                <h3 className='col-4'>Scans</h3>
                <h3 className='col-3'>Orderd Tests/Scans</h3>
                </div></div>
                <div className='tests'>
                <div className='row'>
                    
                    <div className='col-3'>
                    <Table_patients
                data={testsCheckups1}
                headers={columns_tests_checkups1}
                flag={flag}
                anotherProp={role}
                onDataChange={handletestChange}
                ischecktable={true}
                showSearch={false}
                idx_checked ={1}

              />
                    </div>
                    
                    <div className='col-3'>
                    <Table_patients
                data={scansCheckups}
                headers={columns_scans_checkups}
                flag={flag}
                anotherProp={role}
                onDataChange={handlescanChange}
                ischecktable={true}
                showSearch={false}
                idx_checked ={1}
              />
                    </div>
                    <div className='col-1'></div> {/**i use it to make space of one col */}
                    <div className='col-4'>
                        <div className='orderedscans'>
                        <ul>
              {allCheckedItems.map((item, index) => ( /**here list of checked tests */
                <li key={index}>{item}</li>
              ))}
                 </ul>
                
                
                     </div>

                </div>
                </div>
                </div>
               
                <div className='row' id="submit-btn-report">
                 <div className='col-5 offset-7 '>
                  <div onClick={handle_parent_modal_submit}>
                 <Btn label={"Submit"}  onClick={handlesubmit}/>
                 </div>
                 </div>
                 </div>
            
      
        <button onClick={handle_parent_modal_close} className='close-modal'>

        <CCloseButton dark />
        </button>

      </dialog>
      {childModal &&
      
          <dialog className="dialog-child-modal" open={childModal} >
         <div className='row mb-4'>
            <input type='text' placeholder='Medication Name' className='med_name'  value={medicationName}
                  onChange={(e) => setMedicationName(e.target.value)} />
         </div>
         <div className='row mb-4 '>
            <div className='col-4 '>
                <h4>Frequency</h4>
            </div>
            <div className='col-3  '>
                <input type='number' className='input-num' placeholder='5' value={frequencyNum}
                    onChange={(e) => setFrequencyNum(e.target.value)}/>
            </div>
            <div className='col-1  '>  <span style={{ fontSize: '20px', color: "#258176", marginTop:"-15px"}}>/</span></div>
            <div className='col-4  '>
            <input type="text" value={options[currentIndex]} readOnly  className='input-text'/>
      <button onClick={handleNext} className='btn-frequency'><TbTriangleInvertedFilled/></button>
      
            </div>
         </div>
        
         <div className='row mb-4'>
            <div className='col-4'>
                <h4>Dosage</h4>
            </div>
            <div className='col-3'>
                <input type='number' className='input-num' placeholder='500' value={dosage}
                    onChange={(e) => setDosage(e.target.value)}/>
            </div>
            <div className='col-1'> </div> {/**space */}
            <div className='col-4'>
                <input type='text' value={"mg"} readOnly className='input-text'/> {/**as always the dosage will be in mg */}
            </div>
         </div>
         <div className='row mb-4'>
            <div className='col-4'>
                <h4>Duration</h4>
            </div>
            <div className='col-3'>
                <input type='number' className='input-num' placeholder='18'  value={durationNum}
                    onChange={(e) => setDurationNum(e.target.value)}/>
            </div>
            <div className='col-1'> </div> {/**space */}
            <div className='col-4'>
            <input type="text" value={options_duartion[currentIndexDur]} readOnly className='input-text'/> {/**prevent user from modify or write*/}
            {/**the value set the value shown in the input box based on the index */}
      <button onClick={handleNext_duration} className='btn-duration'><TbTriangleInvertedFilled/></button>
      
            </div>
         </div>
         <div className='row'>
            <div className='col-12 submit-child-modal' onClick={handleMedicationSubmit}>
            <Btn label={"submit"} /> </div></div>


            <button onClick={toggleChildModal} className='close-modal'>
              <CCloseButton dark />
            </button>
          </dialog>
      
        }
     
      </div>
    </div>
    </div>
  );
}

export default AddReport;
