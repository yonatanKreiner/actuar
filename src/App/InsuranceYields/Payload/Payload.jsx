import React from 'react'; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Payload.css";

 const Payload = () => {

    return (
        <div>
            <div className='payload-input-container'>
                <span className='input-container'>
                    מזהה הקרן:
                    <input type={'text'} />
                </span>
                <span className='input-container'>
                    תאריך התחלה:
                    <DatePicker dateFormat={"dd/MM/yyyy"} tabIndex={1} />
                </span>
                <span className='input-container'>
                    תאריך סיום:
                    <DatePicker dateFormat={"dd/MM/yyyy"} tabIndex={2} />
                </span>
                <span className='input-container'>
                    סכום:
                    <input type={'number'}/>
                </span>
            </div>
            <button type='button' className='btn-result btn btn-primary'>חשב</button>
        </div>
    );
};

export default Payload;