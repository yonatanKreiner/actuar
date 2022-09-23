
import React from 'react'; 
import PropTypes from 'prop-types';
import SalaryRow from './SalaryRow';

const SalaryTable = (props) => {
	const rows = [];

	props.salaries.forEach((salary, index) => {
       rows.push(
		    <SalaryRow key={index} index={index} {...salary} changeRow={props.changeRow}>
            </SalaryRow>
		);
	});

	return (
		<div className='chilren-container'>
			<table style={{direction:"rtl"}} className="table table-bordered">
				<thead className="thead-light"> 
					<tr>
						<th>חודש</th>
						<th>שכר לפנסיה</th>
						<th>דמי גמולים -  תגמולי עובד</th>
						<th>דמי גמולים -  תגמולי מעסיק</th>
					</tr>
				</thead>
				<tbody>
					{rows}
				</tbody>
			</table>
			<input type='button' className='btn btn-info' onClick={() => {
					props.addRow();
				}} value='הוסף'/>
			<input type='button' className='btn btn-warning' onClick={() => {props.removeRow()}} value='הסר'/>
		</div>
	);
}

SalaryTable.propTypes = {
	salaries: PropTypes.array.isRequired,
    addRow: PropTypes.func,
    removeRow: PropTypes.func,
    changeRow: PropTypes.func
}

export default SalaryTable;
