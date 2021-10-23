import './DebtsTable.css';

import React from 'react'; 
import PropTypes from 'prop-types';

import DebtRow from './DebtRow';
import CsvReader from './CSVReader';

const DebtsTable = (props) => {
	const rows = [];

	props.debts.forEach((debt, index) => {
		rows.push(
			// <div>
				<DebtRow key={index} index={index} handleChangeDebt={props.handleChangeDebt} debt={debt} />
				// <hr style={{width:'70%'}} />
			// </div>
		);
	});

	return (
		<div className='buttons-control'>
			{/* {rows} */}
			<table style={{direction:"rtl"}} className="table table-bordered">
				<thead className="thead-light"> 
					<tr>
						<th>חוב</th>
						<th>מתאריך</th>
						<th>סוג ריבית</th>
						<th>עד תאריך</th>
						<th>שווי הצדמה</th>
						<th>שווי ריבית</th>
						<th>סה"כ</th>
					</tr>
				</thead>
				<tbody>
					{rows}
				</tbody>
			</table>
			<div>
				<input type='button' className='btn btn-info' onClick={() => {
						let date = new Date();
						props.addDebt({date: date.getDate() +'/'+date.getMonth()+'/'+date.getFullYear(), sum: 0})
					}} value='הוסף'/>
				<input type='button' className='btn btn-warning' onClick={() => {props.removeDebt()}} value='הסר'/>
				<CsvReader importDebts={props.importDebts}/>
			</div>
		</div>
	);
}

DebtsTable.propTypes = {
	debts: PropTypes.array.isRequired,
	handleChangeDebt: PropTypes.func.isRequired,
	addDebt: PropTypes.func.isRequired,
	removeDebt: PropTypes.func.isRequired,
	importDebts: PropTypes.func.isRequired
}

export default DebtsTable;
