import './GeneralPayload.css';

import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const GeneralPayload = (props) => {

    useEffect(() => {

    }, []);
    
    const onChangeAggrimentSignDate = (value) => {
        props.onChange(value, props.startDate, props.calcDate, props.baseIndexateDate, props.madadIndexateInterval);
    }

    const onChangeStartDate = (value) => {
        let indexateDate = new Date(value);
        indexateDate = indexateDate.setMonth(indexateDate.getMonth() - 2);

        props.onChange(props.aggrimentDate, value.setDate(1), props.calcDate, indexateDate, props.madadIndexateInterval);
    }

    const onChangeCalcDate = (value) => {
        props.onChange(props.aggrimentDate, props.startDate, value.setDate(1), props.baseIndexateDate, props.madadIndexateInterval);
    }

    const onChangeBaseIndexateDate = (value) => {
        props.onChange(props.aggrimentDate, props.startDate, props.calcDate, value.setDate(1), props.madadIndexateInterval);
    }

	const onChangeMadadInterval = (e) => {
        props.onChange(props.aggrimentDate, props.startDate, props.calcDate, props.baseIndexateDate, parseInt(e.target.value));
	}

    return (
        <div className='alimony-payments-general'>
            <h5 style={{textAlign:"right"}}>פרטי ההסכם</h5>
            <span className='general-payload'>
                תאריך חתימת הסכם:
                <div className="datepicker">
                    <DatePicker selected={new Date(props.aggrimentDate)} onChange={onChangeAggrimentSignDate} dateFormat={"dd/MM/yyyy"} minDate={new Date(1990,1,1)} tabIndex={1} />
                </div>
            </span>
            <span className='general-payload'>
                חודש תשלום ראשון:
            <div className="datepicker">
                <DatePicker selected={new Date(props.startDate)} onChange={onChangeStartDate} dateFormat={"MM/yyyy"} minDate={new Date(1990,1,1)} tabIndex={2} />
            </div>
            </span>
            <span className='general-payload'>
                חודש לחישוב:
            <div className="datepicker">
                <DatePicker selected={new Date(props.calcDate)} onChange={onChangeCalcDate} dateFormat={"MM/yyyy"} minDate={new Date(1990,1,1)} tabIndex={3} />
            </div>
            </span>
            <span className='general-payload'>
                חודש ממד בסיס:
            <div className="datepicker">
                <DatePicker selected={new Date(props.baseIndexateDate)} onChange={onChangeBaseIndexateDate} dateFormat={"MM/yyyy"} minDate={new Date(1990,1,1)} tabIndex={4} />
            </div>
            </span>
            <span className='general-payload'>
                הצמדה למדד(כל מספר חודשים): 
                <input type='number' max={12} min={0} className="form-text madad-interval-picker" onChange={onChangeMadadInterval} value={props.madadIndexateInterval} tabIndex={5} />
            </span>
        </div>
    );
}

GeneralPayload.propTypes = {
    aggrimentDate: PropTypes.object,
    startDate: PropTypes.object.isRequired,
    calcDate: PropTypes.object.isRequired,
    baseIndexateDate: PropTypes.object.isRequired,
    madadIndexateInterval: PropTypes.number.isRequired,
	onChange: PropTypes.func.isRequired
};

export default GeneralPayload;
