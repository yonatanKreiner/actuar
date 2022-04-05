import React from 'react'; 
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Payload.css";

 const Payload = (props) => {

    const updateFund = (e) => {
        props.updatePayload(
            parseFloat(e.target.value),
            props.startDate,
            props.endDate,
            props.sum
        );
    }

    const updateStartDate = (value) => {
        props.updatePayload(
            props.fundId,
            value,
            props.endDate,
            props.sum
        );
    }

    const updateEndDate = (value) => {
        props.updatePayload(
            props.fundId,
            props.startDate,
            value,
            props.sum
        );
    }

    const updateSum = (e) => {
        props.updatePayload(
            props.fundId,
            props.startDate,
            props.endDate,
            parseFloat(e.target.value)
        );
    }

    return (
        <div>
            <div className='payload-input-container'>
                <span className='input-container'>
                    מזהה הקרן:
                    <input type={'text'} value={props.fundId} onChange={updateFund} />
                </span>
                <span className='input-container'>
                    תאריך התחלה:
                    <DatePicker dateFormat={"dd/MM/yyyy"} tabIndex={1} selected={new Date(props.startDate)} onChange={updateStartDate} />
                </span>
                <span className='input-container'>
                    תאריך סיום:
                    <DatePicker dateFormat={"dd/MM/yyyy"} tabIndex={2} selected={new Date(props.endDate)} onChange={updateEndDate} />
                </span>
                <span className='input-container'>
                    סכום:
                    <input type={'number'} value={props.sum} onChange={updateSum}/>
                </span>
            </div>
        </div>
    );
};

Payload.propTypes = {
    fundId:PropTypes.number.isRequired,
    startDate:PropTypes.object.isRequired,
    endDate:PropTypes.object.isRequired,
    sum: PropTypes.number.isRequired,
    updatePayload: PropTypes.func.isRequired,
}

export default Payload;