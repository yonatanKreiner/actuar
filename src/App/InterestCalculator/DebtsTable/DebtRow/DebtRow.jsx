import './DebtRow.css';

import React from 'react';
import PropTypes from 'prop-types';

const $ = window.jQuery;

class DeptRow extends React.Component{
	componentDidMount(){
		let datePickerId = 'datepicker'+this.props.index;
		$('#' + datePickerId).datepicker({
			format: 'dd/mm/yyyy'
		});

		$('#' + datePickerId).change(() => this.props.handleDateChange(this.props.index, $('#' + datePickerId).val()));
	}

	render() {
		return (
			<div className='container row'>
				<input id={'datepicker'+this.props.index} className='datepicker' 
					onChange={(e) => this.props.handleDateChange(this.props.index,e.target.value)}
					value={this.props.date} />
				<input type='number' className="form-text amoutpicker" onChange={(e) => {this.props.handleSumChange(this.props.index, e.target.value)}} min='0' value={this.props.sum} />
			</div>
		);
	}
}

DeptRow.propTypes = {
	index: PropTypes.number.isRequired,
	date: PropTypes.string.isRequired,
	sum: PropTypes.number.isRequired,
	handleDateChange: PropTypes.func,
	handleSumChange: PropTypes.func
};

export default DeptRow;
