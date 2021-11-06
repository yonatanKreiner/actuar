import './GeneralPayload.css';

import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const GeneralPayload = (props) => {

    useEffect(() => {

	}, []);

    const onChangeStartDate = (value) => {
        props.onChange(value, props.madadIndexateInterval);
    }

	const onChangeMadadInterval = (e) => {
        props.onChange(props.startDate, parseInt(e.target.value));
	}

    return (
        <div className='alimony-payments-general'>
            <span className='general-payload'>
                תאריך התחלת תשלום: 
                <DatePicker selected={new Date(props.startDate)} onChange={onChangeStartDate} dateFormat={"dd/MM/yyyy"} />
            </span>
            <span className='general-payload'>
                הצמדה למדד(כל מספר חודשים): 
                <input type='number' max={12} min={0} className="form-text madad-interval-picker" onChange={onChangeMadadInterval} value={props.madadIndexateInterval} />
            </span>
        </div>
    );
}

GeneralPayload.propTypes = {
    startDate: PropTypes.object.isRequired,
    madadIndexateInterval: PropTypes.number.isRequired,
	onChange: PropTypes.func.isRequired
};

export default GeneralPayload;
