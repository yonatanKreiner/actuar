import './DebtsTable.css';

import React from 'react'; 
import PropTypes from 'prop-types';

import DebtRow from './DebtRow';

const DebtsTable = (props) => {
	const rows = [];

	props.debts.forEach((debt, index) => {
		rows.push(
			<DebtRow key={index} index={index} handleDateChange={props.changeDebtDate} handleSumChange={props.changeDebtSum} date={debt.date} sum={debt.sum}/>
		);
	});

	return (
		<div className='buttons-control'>
			{rows}
			<input type='button' className='btn btn-info' onClick={() => {
					let date = new Date();
					props.addDebt({date: date.getDate() +'/'+date.getMonth()+'/'+date.getFullYear(), sum: 0})
				}} value='הוסף'/>
			<input type='button' className='btn btn-warning' onClick={() => {props.removeDebt()}} value='הסר'/>
		</div>
	);
}

DebtsTable.propTypes = {
	debts: PropTypes.array.isRequired,
	changeDebtDate: PropTypes.func,
	changeDebtSum: PropTypes.func.isRequired,
	addDebt: PropTypes.func.isRequired,
	removeDebt: PropTypes.func.isRequired
}

export default DebtsTable;
