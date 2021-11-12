import './GeneralPayload.css';

import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const GeneralPayload = (props) => {

    useEffect(() => {

	}, []);

    const onChangeStartDate = (value) => {
        props.onChange(value, props.calcDate, props.baseIndexateDate, props.madadIndexateInterval);
    }

    const onChangeCalcDate = (value) => {
        props.onChange(props.startDate, value, props.baseIndexateDate, props.madadIndexateInterval);
    }

    const onChangeBaseIndexateDate = (value) => {
        props.onChange(props.startDate, props.calcDate, value, props.madadIndexateInterval);
    }

	const onChangeMadadInterval = (e) => {
        props.onChange(props.startDate, props.calcDate, props.baseIndexateDate, parseInt(e.target.value));
	}

    return (
        <div className='alimony-payments-general'>
            <span className='general-payload'>
                תאריך התחלת הסכם: 
                <div className="datepicker">
                    <DatePicker  selected={new Date(props.startDate)}  onChange={onChangeStartDate} dateFormat={"dd/MM/yyyy"} />
                </div>
            </span>
            <span className='general-payload'>
                תאריך תשלום: 
            <div className="datepicker">
                <DatePicker selected={new Date(props.calcDate)} onChange={onChangeCalcDate} dateFormat={"dd/MM/yyyy"} />
            </div>
            </span>
            <span className='general-payload'>
                תאריך ממד בסיס: 
            <div className="datepicker">
                <DatePicker selected={new Date(props.baseIndexateDate)} onChange={onChangeBaseIndexateDate} dateFormat={"dd/MM/yyyy"} />
            </div>
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
    calcDate: PropTypes.object.isRequired,
    baseIndexateDate: PropTypes.object.isRequired,
    madadIndexateInterval: PropTypes.number.isRequired,
	onChange: PropTypes.func.isRequired
};

export default GeneralPayload;
