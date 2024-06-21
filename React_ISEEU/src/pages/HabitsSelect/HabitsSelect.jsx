import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./HabitsSelect.css";
import Checkbox from "../../components/checkbox/Checkbox";
import {Btn} from "../../components";

const HabitsSelect = () => {
    const [selected, setSelected] = useState([]);

    const handleCheckboxChange = (item) => {
        setSelected(prevSelected =>
            prevSelected.includes(item)
                ? prevSelected.filter(i => i !== item)
                : [...prevSelected, item]
        );
    };

    const options = ["asfklakaslnlsafnk", "anotherHabit", "thirdHabit"];

    return (
        <div className="HabitsCont">
            <div className="container-fluid">
                <div className="row">
                    <div id="SelectForm" className="col-10 mx-auto">
                        <form>
                            <div className="row">
                                <div id="SelectPreview" className="col-3">
                                    <ul>
                                        <li className={"selectedHeader"}>Selected</li>
                                        {selected.map((item, index) => (
                                            <li className={"selectedItem"} key={index}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div id="inputs" className="col-9">
                                    <p id="scndTitle">Select Habits</p>
                                    {options.map((option, index) => (
                                        <div className={"selectOption"} key={index}>
                                            <div className={"row"}>
                                                <div className={"col-1"}>
                                                    <Checkbox
                                                        checked={selected.includes(option)}
                                                        onChange={() => handleCheckboxChange(option)}
                                                    />
                                                </div>
                                                <div className={"col-7"}>
                                                    <p className={"optionP"}>{option}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="row" id={"footer"}>
                                        <div className="col-3">
                                            <Btn label="Back"/>
                                        </div>
                                        <div className="col-3 offset-6">
                                            <Btn label="Next"/>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HabitsSelect;
