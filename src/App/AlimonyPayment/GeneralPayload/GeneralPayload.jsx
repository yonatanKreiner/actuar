import './GeneralPayload.css';

import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

const $ = window.jQuery;

const GeneralPayload = (props) => {

    useEffect(() => {
		let datePickerId = 'datepicker-startpayment';
		$('#' + datePickerId).datepicker({
			format: 'dd/mm/yyyy'
		});
        $('#' + datePickerId).change(onChangeStartDate);
	}, []);

    const onChangeStartDate = (e) => {
        props.onChange(e.target.value, props.madadIndexateInterval);
    }

	const onChangeMadadInterval = (e) => {
        props.onChange(props.startDate, e.target.value);
	}

    return (
        <div className='alimony-payments-general'>
            <span className='general-payload'>
                תאריך התחלת תשלום: 
                <input id={'datepicker-startpayment'} onChange={onChangeStartDate} value={props.startDate} />
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
