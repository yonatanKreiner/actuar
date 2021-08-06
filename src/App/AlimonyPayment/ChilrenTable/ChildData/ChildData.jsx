import './ChildData.css';

import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

const $ = window.jQuery;

const ChildData = (props) => {
	useEffect(() => {
		let datePickerId = 'datepicker'+ props.index;
		$('#' + datePickerId).datepicker({
			format: 'dd/mm/yyyy'
		});

		$('#' + datePickerId).change(() => props.handleDateChange(props.index, $('#' + datePickerId).val()));
	}, []);

	return (
		<div className='container child-data-container-row'>
			<span className="data-row">
				תאריך לידה: 
				<input id={'datepicker'+props.index} className='datepicker' value={props.date} />
			</span>
			<span className="data-row">
				סכום מזונות: 
				<input type='number' className="form-text amoutpicker" onChange={(e) => {props.handleSumChange(props.index, e.target.value)}} min='0' value={props.sum} />
			</span>
			<span className="data-row">
				אחוז שארית (מגיל 18):
				<input type="number" step="0.01" className="form-text amoutpicker" />
			</span>
			<span className="data-row data-row-space-even">
				<span className="custom-control custom-radio">
					<input type="radio" className="custom-control-input" id="male" name="child-gender" checked />
					<label className="custom-control-label" for="male">זכר</label>
				</span>
				<span className="custom-control custom-radio">
					<input type="radio" className="custom-control-input" id="female"  name="child-gender"  />
					<label className="custom-control-label" for="female">נקבה</label>
				</span>
			</span>
		</div>
	);
}

ChildData.propTypes = {
	index: PropTypes.number.isRequired,
	date: PropTypes.string.isRequired,
	sum: PropTypes.number.isRequired,
	handleDateChange: PropTypes.func,
	handleSumChange: PropTypes.func
};

export default ChildData;
