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
            props.sum,
            props.yieldType
        );
    }

    const updateStartDate = (value) => {
        props.updatePayload(
            props.fundId,
            value,
            props.endDate,
            props.sum,
            props.yieldType
        );
    }

    const updateEndDate = (value) => {
        props.updatePayload(
            props.fundId,
            props.startDate,
            value,
            props.sum,
            props.yieldType
        );
    }

    const updateSum = (e) => {
        props.updatePayload(
            props.fundId,
            props.startDate,
            props.endDate,
            parseFloat(e.target.value),
            props.yieldType
        );
    }

    const updateYieldType = (e) => {
        props.updatePayload(
            props.fundId,
            props.startDate,
            props.endDate,
            props.sum,
            e.target.value
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
                    <div><DatePicker dateFormat={"dd/MM/yyyy"} tabIndex={1} selected={new Date(props.startDate)} onChange={updateStartDate} /></div>
                </span>
                <span className='input-container'>
                    תאריך סיום:
                    <div><DatePicker dateFormat={"dd/MM/yyyy"} tabIndex={2} selected={new Date(props.endDate)} onChange={updateEndDate} /></div>
                </span>
                <span className='input-container'>
                    סכום:
                    <input type={'number'} value={props.sum} onChange={updateSum}/>
                </span>
                <div className='yield-type-radio-block'>
					<div className="custom-control custom-radio">
						<input type="radio" className="custom-control-input" 
							name={"yield-type"} 
							id={`insurance`}
                            onClick={updateYieldType}
							value={`insurance`}
							checked={props.yieldType == "insurance"}
						/>
						<label for={`insurance`} className="custom-control-label radio-label">ביטוח נט</label>
					</div>
					<div className="custom-control custom-radio">
						<input type="radio" className="custom-control-input" 
							name={"yield-type"}
							id={`provident`}
                            onClick={updateYieldType}
							value={`provident`}
							checked={props.yieldType == "provident"}
						/>
						<label for={`provident`} className="custom-control-label radio-label">גמל נט</label>
					</div>
                    <div className="custom-control custom-radio">
						<input type="radio" className="custom-control-input" 
							name={"yield-type"}
							id={`pension`}
                            onClick={updateYieldType}
							value={`pension`}
							checked={props.yieldType == "pension"}
						/>
						<label for={`pension`} className="custom-control-label radio-label">פנסיה נט</label>
					</div>
				</div>
            </div>
        </div>
    );
};

Payload.propTypes = {
    fundId:PropTypes.number.isRequired,
    startDate:PropTypes.object.isRequired,
    endDate:PropTypes.object.isRequired,
    sum: PropTypes.number.isRequired,
    yieldType: PropTypes.string.isRequired,
    updatePayload: PropTypes.func.isRequired,
}

export default Payload;