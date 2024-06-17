import React, { useState } from 'react';
import "./addReport.css";
import { CCloseButton } from '@coreui/react';
import { Table_patients,Btn} from '../../components';
import { FaPlus } from 'react-icons/fa'; /**for adding "add" to the medication */
import { TbTriangleInvertedFilled } from "react-icons/tb"; /**for the choices in the medication modal */
const AddReport = () => {
  const [modal, setModal] = useState(false); /**intillay the report modal is false untill i click on the add report button */
  const [childModal,setchildModal]=useState(false)


  const role="user";
  const flag=false;
  const  initialMedication=[["Devil Breath (500gm)","5  /day","5 weeks","unchecked"],] /**here i take the intial medication from database */
  const[medication,setmedication]=useState(initialMedication)
  const medication_header=["    ","  "," "," "]
  const initialtestsCheckups1=[["cbc","checked"],["db","unchecked"],["cbcc","checked"]]; /**take  the tests from database */
  const [testsCheckups1, settestsCheckups1] = useState(initialtestsCheckups1);
  const columns_tests_checkups1=["A"," "];
  const initialscansCheckups=[["Chest","checked"],["Brain MRI","unchecked"],["X-Ray","checked"]]; /**take the scans from database */
  const [scansCheckups, setscansCheckups] = useState(initialscansCheckups);
  const columns_scans_checkups=["B"," "];
  const [medicationName, setMedicationName] = useState(''); /**this for define the info from sumbit to be added to the table */
  const [frequencyNum, setFrequencyNum] = useState('');
  const [dosage, setDosage] = useState('');
  const [durationNum, setDurationNum] = useState('');
   // Function to filter checked items to make it appear in the orderd scans/tests
   const getCheckedItems = (checkups) => {
    return checkups
      .filter(item => item[1] === 'checked') // Filter only checked items
      .map(item => item[0]); // Extract the item name
  };

  // Get all checked items from both checkups tables (scans ,tests)
  const allCheckedItems = [
    ...getCheckedItems(testsCheckups1),
    ...getCheckedItems(scansCheckups)
  ];
  const handleDataChange1 = (newData) => { // here i change the data of the patient if checked or not " toggle first value"
    settestsCheckups1(newData);
  };
  const handleDataChange2 = (newData) => { // here i change the data of the patient if checked or not " toggle first value"
    setscansCheckups(newData);
  };
  const handleMedicationChange=(newData) => { // here i change the data of the patient if checked or not " toggle first value"
    setmedication(newData);
  };
  const toggleModal = () => { /**here i toggle the state of report modal when i click on the button need to be modify after patient profile */
    setModal(!modal);
    document.body.classList.toggle('active-modal');
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
  const options = ['day', 'week', 'month'];
  const [currentIndex, setCurrentIndex] = useState(0); /**for the choices in the medication modal */
  const handleNext = () => { /**fot the choices of the medication modal */
    setCurrentIndex((prevIndex) => (prevIndex + 1) % options.length); /** "% "to ensure you go in cycle */
  };
  const options_duartion = ['days', 'weeks', 'months'];
  const [currentIndexDur, setCurrentIndexDur] = useState(0); /**for the choices in the medication modal */
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
    toggleChildModal();
  };

  return (
    <div className='add_report_content'>
      <button 
        className='btn-modal'
        onClick={toggleModal}
      > 
        Add Report
      </button>
      <div>
      <div className='container-fluid'>
      <dialog className="dialog-modal" open={modal} >
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
         
         
                <textarea></textarea> {/**text area for multi line text as the input support only one line */}
                </div>
             
                <div className='col-1'></div> {/**i make space between them */}
        <div className='medication col-5 p-0 m-0 '>
        
 
        <Table_patients 
         data={medication}
         headers={medication_header}
         flag={flag}
         anotherProp={role}
         onDataChange={handleMedicationChange}
         ischecktable={true}
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
                onDataChange={handleDataChange1}
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
                onDataChange={handleDataChange2}
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
                 <Btn data={"Submit"}/>
                 </div>
                 </div>
            
      
        <button onClick={toggleModal} className='close-modal'>

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
            <Btn data={"submit"} /> </div></div>


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
