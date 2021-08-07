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
				<input id={'datepicker'+props.index} className='datepicker' value={props.child.date} />
			</span>
			<span className="data-row">
				סכום מזונות: 
				<input type='number' className="form-text amoutpicker" onChange={(e) => {props.handleSumChange(props.index, e.target.value)}} min='0' value={props.child.sum} />
			</span>
			<span className="data-row">
				אחוז שארית (מגיל 18):
				<input type="number" step="0.01" className="form-text amoutpicker" value={props.child.adultPrecent} />
			</span>
			<span className="data-row data-row-space-even">
				<span className="custom-control custom-radio">
					<input type="radio" className="custom-control-input" 
						 name={"child-gender"+props.index} 
						 value="male"
						checked={props.child.gender === "male"} />
					<label className="custom-control-label">זכר</label>
				</span>
				<span className="custom-control custom-radio">
					<input type="radio" className="custom-control-input" 
						name={"child-gender"+props.index} 
						value="female"
						checked={props.child.gender === "female"} />
					<label className="custom-control-label">נקבה</label>
				</span>
			</span>
		</div>
	);
}

ChildData.propTypes = {
	index: PropTypes.number.isRequired,
	child: PropTypes.object.isRequired,
	handleDateChange: PropTypes.func,
	handleSumChange: PropTypes.func
};

export default ChildData;
