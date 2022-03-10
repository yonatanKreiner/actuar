import './GeneralPayload.css';

import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'react-simple-snackbar'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const GeneralPayload = (props) => {

    const [openSnackbar] = useSnackbar();
    const MIN_DATE = new Date(1990,0,1);

    useEffect(() => {

    }, []);

    const getValidDate = (date) => {
        let validDate = date;
        if(validDate < MIN_DATE) {
            openSnackbar('במערכת ניתן לחשב הסכמים החל מ01/01/1990');
            validDate = MIN_DATE;
        }

        return validDate;
    }

    const onChangeAggrimentSignDate = (value) => {
        props.onChange(getValidDate(value), 
                props.startDate, 
                props.calcDate, 
                props.baseIndexateDate, 
                props.madadIndexateInterval,
                props.paymentDayInMonth);
    }

    const onChangeStartDate = (value) => {
        let indexateDate = new Date(value);
        indexateDate = indexateDate.getDate() < 15 ? 
                    indexateDate.setMonth(indexateDate.getMonth() - 2) : indexateDate.setMonth(indexateDate.getMonth() - 1);

        props.onChange(props.aggrimentDate,
                getValidDate(value),
                props.calcDate, 
                indexateDate, 
                props.madadIndexateInterval,
                props.paymentDayInMonth);
    }

    const onChangeCalcDate = (value) => {
        props.onChange(props.aggrimentDate, 
            props.startDate, 
            getValidDate(value), 
            props.baseIndexateDate, 
            props.madadIndexateInterval,
            props.paymentDayInMonth);
    }

    const onChangeBaseIndexateDate = (value) => {
        props.onChange(props.aggrimentDate, 
            props.startDate, 
            props.calcDate,  
            getValidDate(value), 
            props.madadIndexateInterval,
            props.paymentDayInMonth);
    }

	const onChangeMadadInterval = (e) => {
        props.onChange(props.aggrimentDate, 
            props.startDate, 
            props.calcDate, 
            props.baseIndexateDate, 
            parseInt(e.target.value),
            props.paymentDayInMonth);
	}

    const onChangeMonthlyPayDay = (e) => {
        props.onChange(props.aggrimentDate, 
            props.startDate, 
            props.calcDate, 
            props.baseIndexateDate, 
            props.madadIndexateInterval,
            parseInt(e.target.value));
	}

    return (
        <div className='alimony-payments-general'>
            <h5 style={{textAlign:"right"}}>פרטי ההסכם</h5>
            <span className='general-payload'>
                תאריך חתימת הסכם:
                <div className="datepicker">
                    <DatePicker selected={new Date(props.aggrimentDate)} onChange={onChangeAggrimentSignDate} dateFormat={"dd/MM/yyyy"} tabIndex={1} />
                </div>
            </span>
            <span className='general-payload'>
                חודש תשלום ראשון:
            <div className="datepicker">
                <DatePicker selected={new Date(props.startDate)} onChange={onChangeStartDate} dateFormat={"dd/MM/yyyy"} tabIndex={2} />
            </div>
            </span>
            <span className='general-payload'>
                חודש לחישוב:
            <div className="datepicker">
                <DatePicker selected={new Date(props.calcDate)} onChange={onChangeCalcDate} dateFormat={"dd/MM/yyyy"} tabIndex={3} />
            </div>
            </span>
            <span className='general-payload'>
                חודש ממד בסיס:
                <div className="datepicker">
                    <DatePicker selected={new Date(props.baseIndexateDate)} onChange={onChangeBaseIndexateDate} dateFormat={"dd/MM/yyyy"} tabIndex={4} />
                </div>
            </span>
            <span className='general-payload'>
                הצמדה למדד(כל מספר חודשים): 
                <input type='number' max={12} min={0} className="form-text madad-interval-picker" onChange={onChangeMadadInterval} value={props.madadIndexateInterval} tabIndex={5} />
            </span>
            <span className='general-payload'>
                יום בחודש לתשלום: 
                <input type='number' max={31} min={0} onChange={onChangeMonthlyPayDay} className="form-text madad-interval-picker" tabIndex={6} value={props.paymentDayInMonth} />
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
	onChange: PropTypes.func.isRequired,
    paymentDayInMonth: PropTypes.number
};

export default GeneralPayload;
