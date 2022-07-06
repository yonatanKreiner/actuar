import './DebtsTable.css';

import React from 'react'; 
import PropTypes from 'prop-types';

import DebtRow from './DebtRow';
import CsvReader from './CSVReader';

const DebtsTable = (props) => {
	
	const rows = props.debts.map((debt, index) => 
		<DebtRow key={index} index={index} handleChangeDebt={props.handleChangeDebt} debt={debt} />
	);

	return (
		<div className='buttons-control'>
			<table id="results-table" style={{direction:"rtl"}} className="table table-bordered">
				<thead className="thead-light"> 
					<tr>
						<th>חוב</th>
						<th>סוג ריבית</th>
						<th>מתאריך</th>
						<th>עד תאריך</th>
						<th>שווי הצמדה</th>
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
						props.addDebt({
							startDate: new Date(),
							sum: 0, 
							interestType: 'legal-interest', 
							endDate: new Date(),
						})
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
