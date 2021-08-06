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
			<input id={'datepicker'+props.index} className='datepicker' value={props.date} />
			<input type='number' className="form-text amoutpicker" onChange={(e) => {props.handleSumChange(props.index, e.target.value)}} min='0' value={props.sum} />
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
