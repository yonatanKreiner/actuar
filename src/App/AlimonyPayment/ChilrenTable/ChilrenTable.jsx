import './ChilrenTable.css';

import React from 'react'; 
import PropTypes from 'prop-types';

import ChildData from './ChildData';

const ChilrenTable = (props) => {
	const rows = [];

	props.debts.forEach((debt, index) => {
		rows.push(
			<ChildData key={index} index={index} handleDateChange={props.changeDebtDate} handleSumChange={props.changeDebtSum} date={debt.date} sum={debt.sum}/>
		);
	});

	return (
		<div className='chilren-container'>
			{rows}
			<input type='button' className='btn btn-info' onClick={() => {
					let date = new Date();
					props.addDebt({date: date.getDate() +'/'+date.getMonth()+'/'+date.getFullYear(), sum: 0})
				}} value='הוסף'/>
			<input type='button' className='btn btn-warning' onClick={() => {props.removeDebt()}} value='הסר'/>
		</div>
	);
}

ChilrenTable.propTypes = {
	debts: PropTypes.array.isRequired,
	changeDebtDate: PropTypes.func,
	changeDebtSum: PropTypes.func.isRequired,
	addDebt: PropTypes.func.isRequired,
	removeDebt: PropTypes.func.isRequired
}

export default ChilrenTable;
